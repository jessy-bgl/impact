# Historique des émissions de CO2 par catégorie

## Contexte

L'app ne conserve que l'empreinte **courante** : `AppStore.footprints` est écrasé à chaque
recalcul (`src/common/store/store.ts:38`). L'utilisateur ne peut donc pas voir si ses
changements d'habitudes font baisser son bilan — le seul retour réellement motivant d'une app
de bilan carbone.

On ajoute un slice persisté d'instantanés journaliers, alimenté à chaque changement
d'empreinte (réponse au formulaire de profil, ou mise à jour du modèle NGC), et un onglet
« Historique » à côté de « Répartition » sur l'écran Émissions.

Un écran placeholder existe déjà —
`src/features/carbon-footprint/view/screens/history/EmissionsHistory.tsx` affiche
`t("common:comingSoon")` et n'est référencé par aucun navigateur. Il devient le vrai écran.

## Décisions

| Sujet              | Choix                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Granularité        | 1 snapshot / jour, clé `YYYY-MM-DD`, upsert du jour courant                                                               |
| Démarrage du suivi | Rien n'est enregistré tant que le profil n'est pas **complet** (toutes catégories)                                        |
| Doublons           | Un nouveau jour n'est écrit que si au moins une valeur diffère du dernier snapshot (égalité stricte, pas de seuil)        |
| Horloge            | Injectée (`Clock`) pour rendre l'upsert testable                                                                          |
| Visualisation      | Courbe (aire lissée) + chips de filtre par catégorie                                                                      |
| Sélection          | Point cliquable **uniquement** quand le filtre vaut « Tout » → affiche la répartition à cette date. Désélection possible. |
| Variation affichée | Sans sélection : avant-dernier → dernier. Avec sélection du point P : P → dernier.                                        |
| État vide          | Explicite tant qu'il y a moins de 2 snapshots                                                                             |
| Emplacement        | Top-tabs « Répartition » / « Historique » sur l'écran Émissions                                                           |

## Contraintes relevées dans le code

1. **Ne jamais persister d'instances de classe.** `state.footprints` contient des instances
   dont `annualFootprint` est un getter de prototype ; après AsyncStorage + `deepmerge` ce
   sont des objets nus et `annualFootprint` vaut `undefined` — d'où le `isLoading = isNaN(...)`
   de `src/features/carbon-footprint/domain/hooks/useFootprints.ts:46`. Le slice historique
   stocke donc des **nombres bruts**, et l'usecase **refuse d'enregistrer** si une des 5
   valeurs n'est pas un nombre fini (couvre la fenêtre entre la réhydratation et le sync de
   démarrage).

2. **`react-native-gifted-charts@1.4.77` est déjà installé** — `LineChart` disponible, aucune
   nouvelle dépendance.

3. **Pas de `version`/`migrate` sur le persist** ; `merge: mergePersistedState` avec
   `arrayMerge: (_, source) => source` — le tableau persisté remplace le défaut, comportement
   correct pour un historique.

4. **`clearLocalData()`** (`src/features/settings/data/repositories/appData.store.repository.ts:8-15`)
   remplace l'état par `defaultAppStore()` en ne préservant que `analyticsConsent`,
   `shouldShowIntro`, `theme` → l'historique sera bien effacé sans modification, mais il faut
   l'**asserter** dans le test existant.

5. **GDPR** — aucune valeur d'empreinte ne doit partir dans PostHog (AGENTS.md §Privacy).
   Pas d'analytics sur cette feature au-delà du nom d'écran.

---

## 1. Horloge injectable

Nouveaux fichiers (le graphe de dépendances passe déjà des non-repositories, cf.
`computeEngine` dans `Repositories`) :

- `src/common/domain/Clock.ts` — `export interface Clock { now(): Date }`
- `src/common/data/system.clock.ts` — `SystemClock implements Clock`, `now = () => new Date()`
- `src/common/data/clock.stub.ts` — `ClockStub` avec un champ `current: Date` réassignable
  (état observable, pas de `jest.fn()`)

## 2. Entité `FootprintSnapshot`

`src/features/carbon-footprint/domain/entities/history/FootprintSnapshot.ts` — type + helpers
purs, c'est le cœur testable :

```ts
export type FootprintSnapshot = {
  date: string;                                  // jour local, `YYYY-MM-DD`
  footprints: Record<FootprintCategory, number>; // kgCO2e/an, entiers
};

export type FootprintsHistory = FootprintSnapshot[]; // trié par date croissante

export const MIN_SNAPSHOTS_FOR_CHART = 2;

export const toDayKey = (date: Date): string;   // jour LOCAL, pas `toISOString()`
export const totalOf = (snapshot: FootprintSnapshot): number;
export const haveSameFootprints = (a, b): boolean;
export const upsertSnapshot = (history, snapshot): FootprintsHistory;
```

`toDayKey` doit être construit depuis `getFullYear/getMonth/getDate`, **pas**
`toISOString().slice(0,10)` : en France, un relevé après 22h en été tomberait sur le
lendemain UTC.

`upsertSnapshot` maintient l'invariant « jamais deux snapshots consécutifs identiques » et
signale « rien à écrire » en renvoyant **la même référence** :

```ts
const withoutToday =
  history.at(-1)?.date === snapshot.date ? history.slice(0, -1) : history;
const previous = withoutToday.at(-1);
if (previous && haveSameFootprints(previous, snapshot)) return withoutToday;
return [...withoutToday, snapshot];
```

Cas couverts : premier relevé ; second relevé du même jour (remplace) ; second relevé du même
jour revenant à la valeur de la veille (supprime l'entrée du jour) ; nouveau jour modifié
(ajoute) ; nouveau jour identique (référence inchangée → aucune écriture).

`MIN_SNAPSHOTS_FOR_CHART` est exporté ici et consommé par le view model **et** par les tests
(pas de constante métier redéclarée dans un test).

## 3. Slice store

- `src/common/store/store.ts` : ajouter `footprintsHistory: FootprintsHistory` à `AppStore`
- `src/common/store/storeDefaultValues.ts` : `footprintsHistory: []`

## 4. Repositories

**Nouveau** `domain/repositories/footprintsHistory.repository.ts` — volontairement minimal,
toute la logique de fusion reste dans l'entité pure :

```ts
export interface FootprintsHistoryRepository {
  fetchHistory(): FootprintsHistory;
  saveHistory(history: FootprintsHistory): void;
}
```

Implémentations, calquées sur
`src/features/carbon-footprint/data/repositories/actions.store.repository.ts` (le plus simple
des repos existants) : `data/repositories/footprintsHistory.store.repository.ts` et
`…stub.repository.ts`.

**Modifié** `domain/repositories/footprints.repository.ts` : ajouter
`fetchFootprints(): Footprints`. Nécessaire parce que `updateProfile` ne dispose que d'**une**
catégorie au moment du recalcul. Impacte `data/repositories/footprints.store.repository.ts`
(`return this.store.getState().footprints`) et
`data/repositories/footprints.stub.repository.ts` (champs à initialiser avec des instances à
zéro plutôt que `undefined`).

## 5. Usecase `recordFootprintsSnapshot`

`domain/usecases/history/recordFootprintsSnapshot.ts` :

```ts
export const createRecordFootprintsSnapshot = (
  clock: Clock,
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
  footprintsHistoryRepository: FootprintsHistoryRepository,
) => {
  const recordFootprintsSnapshot = (): void => {
    if (!isProfileCompleted(profileRepository.fetchProfileCompletion())) return;

    const snapshot = buildSnapshot(
      toDayKey(clock.now()),
      footprintsRepository.fetchFootprints(),
    );
    if (!snapshot) return; // une valeur non finie → on n'écrit pas

    const history = footprintsHistoryRepository.fetchHistory();
    const next = upsertSnapshot(history, snapshot);
    if (next === history) return; // rien n'a changé
    footprintsHistoryRepository.saveHistory(next);
  };

  return { recordFootprintsSnapshot };
};
```

Réutilise `isProfileCompleted` de
`src/features/carbon-footprint/domain/entities/profile/profileCompletion.ts:31` (qui gère déjà
`societalServices`, catégorie sans section donc toujours complète).

## 6. Points d'accrochage

Trois sites, tous appelant le même usecase auto-gardé. `createUpdateProfile` et
`createSyncFootprintsProfileWithEngine` reçoivent un paramètre supplémentaire
`recordFootprintsSnapshot: () => void` (dépendance explicite, pas d'import croisé entre
usecases) :

| Fichier                                                              | Endroit                                             | Pourquoi                                                                                                       |
| -------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `domain/usecases/profile/updateProfile.ts:46-69`                     | après l'écriture dans `_recomputeCategoryFootprint` | chaque réponse au formulaire                                                                                   |
| `domain/usecases/profile/updateProfile.ts:90-122`                    | fin de `updateProfileCompletion`                    | capte le **tout premier** snapshot à l'instant où le profil devient complet — aucun recalcul ne suit cet appel |
| `domain/usecases/profile/syncFootprintsProfileWithEngine.ts:151-163` | fin de `updateStoredFootprints`                     | démarrage de l'app + refocus Profil → couvre la mise à jour du modèle NGC                                      |

`_recomputeCategoryFootprint` est aujourd'hui un `switch` avec un `return` par branche : le
restructurer pour écrire puis enregistrer.

## 7. Câblage `UsecasesContext`

`src/common/context/UsecasesContext.ts` : ajouter `clock: Clock` et
`footprintsHistoryRepository` à `Repositories`, `initRealRepositories` (`new SystemClock()`,
`new FootprintsHistoryStoreRepository(useAppStore)`) et `initFakeRepositories`
(`new ClockStub()`, `new FootprintsHistoryStubRepository()`). Dans `initUsecases`, construire
`recordFootprintsSnapshot` **avant** les deux usecases qui le consomment, puis le passer en
argument et l'exposer aussi dans l'objet retourné.

## 8. View model et hook

`domain/entities/history/FootprintsHistoryViewModel.ts` — pur, transforme
`(history, filter, selectedDate)` en ce que l'écran rend :

- `points: { date, label, value }[]` — `value` = total si filtre « Tout », sinon la valeur de
  la catégorie filtrée
- `hasEnoughData` = `points.length >= MIN_SNAPSHOTS_FOR_CHART`
- `currentValue` = dernier point
- `variation` = `{ deltaKg, percent, fromDate, direction: "down" | "up" | "stable" }`,
  calculée entre `selectedDate ?? avant-dernier` et le **dernier** point
- `breakdown` — uniquement si filtre « Tout » **et** un point sélectionné. Construit avec
  `FootprintCategoryViewModel.forTransport(...)` etc. puis `distributeParts()`
  (`domain/entities/FootprintViewModel.ts:29-63`) → couleurs, emojis et pourcentages entiers
  gratuits, identiques au donut.

`domain/hooks/useFootprintsHistory.ts` — lit `store.footprintsHistory`, tient l'état local
`filter` / `selectedDate`, mémoïse le view model. Règles de sélection :

- quitter le filtre « Tout » efface la sélection
- retaper le point déjà sélectionné le désélectionne
- le **dernier** point n'est pas sélectionnable (il _est_ « aujourd'hui », delta nul)

## 9. Écran

`view/screens/history/EmissionsHistory.tsx` devient l'orchestrateur. Composants frères :

- `HistoryFilterChips.tsx` — `ScrollView` horizontal de `Chip` Paper : « Tout » (sélectionné →
  fond `primary` #59B158) puis 5 chips outlined bordées de leur couleur de catégorie, avec
  emoji + libellé `t("emissions:categories.<cat>")`
- `HistoryChart.tsx` — `LineChart` gifted-charts, `areaChart` + `curved`, couleur = `primary`
  pour « Tout » sinon la couleur de la catégorie, axe Y en tonnes, axe X daté. Points
  cliquables seulement si filtre « Tout ». ⚠️ Les noms exacts des props de focus/press
  (`focusEnabled`, `onFocus`, `dataPointsPress`…) sont à vérifier contre la 1.4.77 au moment
  d'implémenter, l'API varie entre versions mineures. Repli si besoin : overlay `Pressable`
  positionné sur les points.
- `HistoryVariationCard.tsx` — valeur courante en tonnes, badge de delta (vert `primary` en
  baisse, `error` en hausse, gris `onSurfaceVariant` si stable), « depuis le <date> », et une
  icône « × » de désélection quand un point est sélectionné
- `HistoryBreakdown.tsx` — répartition à la date sélectionnée, en réutilisant la mise en page
  de ligne de `view/screens/emissions/EmissionsDataTable.tsx:54-73` (pastille colorée avec le
  `part` %, libellé, kg)
- `HistoryEmptyState.tsx` — deux messages : profil incomplet ou 0 snapshot → invitation à
  compléter le profil (bouton vers `Profile`, cf.
  `view/screens/emissions/EmissionsEstimationButton.tsx`) ; exactement 1 snapshot → valeur
  affichée + « Reviens après avoir modifié ton profil »

Dates formatées avec `Intl.DateTimeFormat("fr-FR", …)` — aucune librairie de dates dans le
projet et `expo-localization` est déjà présent.

## 10. Navigation (top-tabs)

- Nouveau `view/screens/emissions/EmissionsTabs.tsx` : `createMaterialTopTabNavigator`, deux
  écrans — « Répartition » (le composant `Emissions` actuel) et « Historique ». Copier le
  pattern de `view/screens/actions/Actions.tsx:12`.
- `src/app/pages/Emissions.tsx` rend `EmissionsTabs` au lieu de `Emissions` ; le
  `SafeAreaView` (`edges` top/left/right) reste et place la barre d'onglets sous l'encoche.
- `src/app/EmissionsNavigator.tsx:62-66` reste inchangé (`headerShown: false`) ; la stack
  demeure ancêtre, donc la navigation vers `Profile` depuis `EmissionsEstimationButton`
  continue de fonctionner.
- Clés i18n dans `src/common/translations/fr/emissions.json` : `tabs.distribution`,
  `tabs.history`, plus un bloc `history.*` (titres, états vides, libellés de variation,
  « depuis le {{date}} »). Locale unique `fr`.

## 11. Tests

Stubs à état observable, jamais `jest.fn()` ; constantes métier importées de
`domain/entities/`, jamais redéclarées dans un test.

- `FootprintSnapshot.test.ts` — `toDayKey` (dont une date de soirée d'été qui basculerait en
  UTC), les 5 cas de `upsertSnapshot`, `haveSameFootprints`
- `recordFootprintsSnapshot.test.ts` (`ClockStub` + les 3 stub repositories) — profil
  incomplet → rien ; profil complété → premier snapshot ; deux appels le même jour → une seule
  entrée mise à jour ; nouveau jour identique → ignoré ; nouveau jour modifié → ajouté ;
  `annualFootprint` non fini → ignoré
- `FootprintsHistoryViewModel.test.ts` — variation par défaut = avant-dernier → dernier ; avec
  sélection = point → dernier ; filtre catégorie ; `hasEnoughData` dérivé de
  `MIN_SNAPSHOTS_FOR_CHART` ; `breakdown` nul hors filtre « Tout »
- `appData.store.repository.test.ts` (existant) — asserter que `footprintsHistory` est vidé
- `mergePersistedState.test.ts` (existant) — asserter qu'un historique persisté remplace le
  défaut

## Vérification

1. `npm test` puis `npm run lint` (ESLint + typecheck).
2. `npm run web` (ou `npm run android`), profil vierge → onglet « Historique » affiche l'état
   vide « complète ton profil ».
3. Compléter toutes les catégories → un premier point apparaît, l'écran passe à l'état « un
   seul relevé ».
4. Modifier une réponse le même jour → toujours **un seul** point, valeur mise à jour
   (vérifier `app-storage` dans AsyncStorage / les Redux devtools : une seule entrée).
5. Injecter à la main dans `app-storage` 4 ou 5 snapshots à des dates antérieures, relancer,
   et vérifier sur l'onglet Historique : courbe, chips de filtre (couleur de série qui suit la
   catégorie), tap sur un point → répartition + « depuis le <date> », re-tap → désélection et
   retour au delta avant-dernier → dernier, passage sur un filtre catégorie → points non
   cliquables et sélection effacée.
6. Relancer l'app sans rien modifier → aucun nouveau point (déduplication).
7. Paramètres → effacer mes données → l'historique est vide.
