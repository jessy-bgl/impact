# Tests

## Stratégie générale

Les tests couvrent deux couches distinctes :

- **Calcul du bilan CO2** (`AdemeComputeEngine.test.ts`) — tests unitaires sur le moteur de calcul, indépendants de React
- **Hooks et usecases** (`useFootprints.test.tsx`, `syncEngineWithStoredActions.test.ts`, etc.) — tests d'intégration légers sur la logique applicative

## Tests du moteur de calcul (`AdemeComputeEngine`)

Fichier : `src/features/carbon-footprint/domain/entities/engine/AdemeComputeEngine.test.ts`

### 1. Tests de sanité (profil par défaut)

Vérifient que le profil par défaut (aucune saisie utilisateur = valeurs par défaut du modèle) produit un bilan cohérent avec la moyenne française :

- Bilan total entre 7 et 12 tCO2e
- Chaque catégorie contribue positivement

### 2. Tests directionnels par catégorie

Vérifient que le modèle réagit dans le bon sens à la modification d'un paramètre de formulaire. Ces tests sont stables face aux mises à jour du modèle car ils testent une **relation**, pas une valeur absolue.

| Catégorie    | Paramètre testé                                     | Relation attendue                 |
| ------------ | --------------------------------------------------- | --------------------------------- |
| Transport    | `transport . voiture . km`                          | 0 km < 20 000 km                  |
| Transport    | `transport . avion . long courrier . heures de vol` | 0 h < 20 h                        |
| Alimentation | `alimentation . plats . viande rouge . nombre`      | 0 repas/semaine < 7 repas/semaine |
| Logement     | `logement . surface`                                | 20 m² < 150 m²                    |

### 3. Tests de régression par persona (snapshots)

Les [personas](https://github.com/incubateur-ademe/nosgestesclimat/blob/main/personas/personas-fr.yaml) sont des profils de référence fournis par l'ADEME et inclus dans le package `@incubateur-ademe/nosgestesclimat`. Chaque persona représente un mode de vie typique :

| Persona     | Profil                                                                       |
| ----------- | ---------------------------------------------------------------------------- |
| Marie       | Profil par défaut (situation vide = toutes les valeurs par défaut du modèle) |
| Yoram       | Très faible empreinte : végétalien, sans voiture, Paris                      |
| Corentin    | Étudiant, scooter, petit appartement, chauffage collectif au gaz             |
| Sandy       | Famille avec enfants, alimentation carnée, voiture thermique                 |
| Mehdi       | Voiture électrique, alimentation carnée, grand appartement                   |
| Sylviane    | Maison individuelle chauffée à l'électricité, faibles transports             |
| Jessica     | Forte consommation divers, alimentation variée                               |
| Nolan       | Végétarien, transports en commun                                             |
| Anne Claire | Nombreux vols long-courrier                                                  |
| Gérard      | Forte empreinte : viande quotidienne, grosse voiture thermique               |

Les résultats par catégorie (transport, alimentation, logement, divers, services sociétaux) sont stockés en snapshot dans `__snapshots__/AdemeComputeEngine.test.ts.snap`.

## Mise à jour des snapshots après un changement de modèle

Si une mise à jour du package `@incubateur-ademe/nosgestesclimat` modifie les calculs, les tests de régression échouent et affichent les différences. Après avoir vérifié que les nouvelles valeurs sont attendues :

```bash
npm test -- --updateSnapshot
```

Inspecter le diff du fichier `.snap` avant de le committer pour s'assurer que les changements sont cohérents (ex. : une diminution de l'empreinte transport suite à un changement de facteur d'émission est normale ; une chute à 0 d'une catégorie entière ne l'est pas).

## Lancer les tests

```bash
npm test                             # tous les tests
npm test -- --testPathPattern=Ademe  # tests du moteur uniquement
```
