# Tests

## Principes

- **Moteur et modèle** : intégration contre le vrai modèle ADEME. C'est ce qui rend `npm update @incubateur-ademe/nosgestesclimat` sûr — une release qui change un calcul ou une règle échoue avec le diff exact.
- **Usecases** : repositories **stub**, jamais `jest.fn()`.
- **Aucune constante métier dans un test** : elle vit dans `domain/entities/` (ex. `ademeCategoryRules.ts`), la production la consomme, le test en dérive ses attentes.
- **Aucune redondance** : les cas qui ne diffèrent que par leurs données passent par `it.each`.

## Moteur de calcul

`src/features/carbon-footprint/domain/entities/engine/AdemeComputeEngine.test.ts`

### Cohérence directionnelle

Testent une **relation**, pas une valeur absolue : stables face aux mises à jour du modèle.

| Catégorie    | Paramètre                                           | Relation                               |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| Transport    | `transport . voiture . km`                          | 0 km < 30 000 km (en `'propriétaire'`) |
| Transport    | `transport . avion . usager`                        | `'jamais'` < `'fréquemment'`           |
| Alimentation | `alimentation . plats . viande rouge . nombre`      | 0 < 7 repas/semaine                    |
| Logement     | `logement . surface`                                | 20 m² < 150 m²                         |
| Divers       | `divers . numérique . internet . durée journalière` | 0 h < 10 h par jour                    |

### Snapshots de régression

Le profil par défaut (installation fraîche, aucune réponse) et les 9 [personas](https://github.com/incubateur-ademe/nosgestesclimat/blob/main/personas/personas-fr.yaml) ADEME, chacun sur les 5 catégories.

| Profil            | Mode de vie                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `default profile` | Valeurs par défaut du modèle                                     |
| Yoram             | Très faible empreinte : végétalien, sans voiture, Paris          |
| Corentin          | Étudiant, scooter, petit appartement, chauffage collectif au gaz |
| Sandy             | Famille avec enfants, alimentation carnée, voiture thermique     |
| Mehdi             | Voiture électrique, alimentation carnée, grand appartement       |
| Sylviane          | Maison individuelle chauffée à l'électricité, faibles transports |
| Jessica           | Forte consommation divers, alimentation variée                   |
| Nolan             | Végétarien, transports en commun                                 |
| Anne Claire       | Nombreux vols long-courrier                                      |
| Gérard            | Forte empreinte : viande quotidienne, grosse voiture thermique   |

Le persona **Marie** est exclu : sa `situation` est vide, c'est le profil par défaut sous un autre nom.

### Couverture des sous-règles NGC

Les catégories NGC sont de simples règles `somme` : une sous-règle que `AdemeComputeEngine` ne lit pas disparaît du bilan **sans qu'aucun snapshot ne bouge**. Les attentes sont dérivées de `ademeCategoryRules`.

- Toutes les catégories de `bilan` sont calculées (une 6ᵉ ne peut pas passer inaperçue).
- Toutes les sous-règles de chaque catégorie sont lues. Échec ⇒ mettre à jour `ademeCategoryRules.ts` **et** la méthode `compute*Footprint`.
- Empreinte par catégorie = valeur NGC (écart < 10 kg, arrondis) ; total = `bilan` (< 50 kg).

### Questions oui/non

Aucune question `select-boolean` applicable ne doit être sans option sélectionnée : sinon elle s'affiche vide et laisse ses sous-questions visibles. C'est la raison d'être de l'overlay ci-dessous.

## Overlay du modèle

`src/features/carbon-footprint/data/ademe-model-patch.test.ts`

Le modèle ADEME laisse 46 questions oui/non sans `par défaut` ; l'overlay leur déclare `"non"`. La liste est en snapshot, donc une release qui en ajoute, retire ou renomme une échoue avec le diff. Les autres tests vérifient que l'overlay ne touche rien d'autre, ne mute pas le package, atteint les règles imbriquées dans un `avec`, et lève au lieu d'ignorer une règle introuvable.

## Reste de la suite

| Fichier                                            | Garanties                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `usecases/profile/syncFootprintsProfileWithEngine` | Les 5 empreintes calculées puis persistées ; migration des clés inconnues du moteur ; complétion réinitialisée quand la version d'une section change    |
| `…syncFootprintsProfileWithEngine.ademe`           | Intégration : installation fraîche sans fuite de la moyenne française, sans persister aucune réponse (valeurs figées par le snapshot `default profile`) |
| `usecases/profile/updateProfile`                   | Quotage Publicodes des valeurs, recalcul et persistance par catégorie, versions de complétion                                                           |
| `usecases/actions/syncEngineWithStoredActions`     | États d'actions restaurés indépendamment, `savedFootprint` recalculé depuis le moteur, actions disparues du modèle retirées                             |
| `usecases/actions/updateActionState`               | Transitions d'état, no-op sur id inconnu                                                                                                                |
| `common/store/mergePersistedState`                 | Réponses persistées prioritaires ; complétion d'une sous-catégorie inconnue écartée, sinon la catégorie serait marquée complète à tort                  |
| `settings/…/appData.store.repository`              | La remise à zéro des données préserve la décision de consentement                                                                                       |
| `consent/…/grant` et `revokeAnalyticsConsent`      | État, version de politique, horodatage de décision                                                                                                      |
| `view/…/resolveUnitAffix`                          | Traduction des unités de formulaire, y compris composées                                                                                                |
| `domain/hooks/useFootprints`                       | Parts sommant à 100, chargement tant qu'une valeur est `NaN`                                                                                            |

## Mise à jour des snapshots

Après une mise à jour de `@incubateur-ademe/nosgestesclimat`, vérifier que les nouvelles valeurs sont attendues puis :

```bash
npm test -- --updateSnapshot
```

Inspecter le diff des `.snap` avant de committer. Une baisse de l'empreinte transport suite à un changement de facteur d'émission est normale ; la chute à 0 d'une catégorie ne l'est pas — dans ce cas, c'est le test de couverture des sous-règles qui donne la vraie cause.

## Commandes

```bash
npm test                             # tous les tests
npm test -- --testPathPattern=Ademe  # modèle et moteur uniquement
npm run test:cov                     # avec couverture
npm run lint                         # ESLint + typecheck
```
