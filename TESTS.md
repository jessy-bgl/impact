# Tests

## Principes

- **Moteur et modèle** : intégration contre le vrai modèle ADEME. C'est ce qui rend `npm update @incubateur-ademe/nosgestesclimat` sûr — une release qui change un calcul ou une règle échoue avec le diff exact.
- **Stub, jamais `jest.fn()`** : un stub porte un état observable, donc le test assert sur le résultat et non sur l'appel. Il survit à un changement de signature ; un mock d'appel, non.
- **Aucune constante métier dans un test** : elle vit dans `domain/entities/` (ex. `ademeCategoryRules.ts`), la production la consomme, le test en dérive ses attentes. Un test qui réécrit la constante ne teste plus que lui-même.
- **Aucune redondance** : les cas qui ne diffèrent que par leurs données passent par `it.each`.

## Quoi tester, à quelle couche

| Couche             | Testé contre                                                                                       | Double                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `domain/entities/` | le vrai modèle ADEME dès que l'entité le lit (moteur, `AdemeQuestion`) ; rien pour la logique pure | aucun                                                                             |
| `domain/usecases/` | des repositories stub, jamais le store réel                                                        | `data/repositories/*.stub.repository.ts`, `entities/engine/ComputeEngine.stub.ts` |
| `domain/hooks/`    | le vrai store zustand via `renderHook`                                                             | aucun                                                                             |
| `view/`            | le rendu observable via Testing Library, avec l'i18n et les providers réels                        | aucun ; les libellés attendus sont lus dans les JSON de traduction                |

**Réutiliser les stubs existants** avant d'en écrire un : ils sont à côté de l'implémentation qu'ils remplacent, dans `data/repositories/`. Un stub dupliqué diverge de l'interface sans que rien n'échoue.

**Pas d'e2e.** Ni Detox ni Maestro : la navigation réelle n'est pas couverte, c'est un choix assumé. Les écrans sont testés isolément, montés avec leurs providers.

## Moteur de calcul

`src/features/carbon-footprint/domain/entities/engine/AdemeComputeEngine.test.ts`

### Cohérence directionnelle

Une poignée de cas testent une **relation** entre deux situations (plus de km ⇒ plus de transport, plus de viande rouge ⇒ plus d'alimentation), jamais une valeur absolue. C'est ce qui les rend stables face aux mises à jour du modèle : un facteur d'émission peut bouger, l'ordre reste.

### Snapshots de régression

Le profil par défaut (installation fraîche, aucune réponse) et les 9 [personas](https://github.com/incubateur-ademe/nosgestesclimat/blob/main/personas/personas-fr.yaml) ADEME, chacun sur les 5 catégories.

Le persona **Marie** est exclu : sa `situation` est vide, c'est le profil par défaut sous un autre nom.

### Couverture des sous-règles NGC

Les catégories NGC sont de simples règles `somme` : une sous-règle que `AdemeComputeEngine` ne lit pas disparaît du bilan **sans qu'aucun snapshot ne bouge**. C'est l'angle mort que cette section couvre, et la raison d'être de `ademeCategoryRules`, dont les attentes sont dérivées.

- Toutes les catégories de `bilan` sont calculées (une 6ᵉ ne peut pas passer inaperçue).
- Toutes les sous-règles de chaque catégorie sont lues. Échec ⇒ mettre à jour `ademeCategoryRules.ts` **et** la méthode `compute*Footprint`.
- Empreinte par catégorie = valeur NGC (écart < 10 kg, arrondis) ; total = `bilan` (< 50 kg).

### Moyenne française

`empreinte SDES` (déclarée dans `AdemeComputeEngine.ts`) sert de repère de comparaison à la fin du bilan. La valeur lue sur la racine est comparée à la somme de ses sous-règles NGC, attente dérivée du modèle : un terme ajouté par une release reste couvert, une racine renommée échoue plutôt que de retourner 0.

### Questions oui/non

Aucune question `select-boolean` applicable ne doit être sans option sélectionnée : sinon elle s'affiche vide et laisse ses sous-questions visibles. C'est la raison d'être de l'overlay ci-dessous.

## Overlay du modèle

`src/features/carbon-footprint/data/ademe-model-patch.test.ts`

Le modèle ADEME laisse un lot de questions oui/non sans `par défaut` ; l'overlay leur déclare `"non"`. La liste exacte est en snapshot — c'est elle la source de vérité, pas un compte écrit ici — donc une release qui en ajoute, retire ou renomme une échoue avec le diff. Les autres tests vérifient que l'overlay ne touche rien d'autre, ne mute pas le package, atteint les règles imbriquées dans un `avec`, et lève au lieu d'ignorer une règle introuvable.

## Mise à jour des snapshots

Après une mise à jour de `@incubateur-ademe/nosgestesclimat`, vérifier que les nouvelles valeurs sont attendues puis :

```bash
npm test -- --updateSnapshot
```

Inspecter le diff des `.snap` avant de committer. Une baisse de l'empreinte transport suite à un changement de facteur d'émission est normale ; la chute à 0 d'une catégorie ne l'est pas — dans ce cas, c'est le test de couverture des sous-règles qui donne la vraie cause.

Pour ne rejouer que le modèle et le moteur :

```bash
npm test -- --testPathPattern=Ademe
```

Les commandes générales (`npm test`, `npm run test:cov`, `npm run lint`) sont dans `AGENTS.md`.
