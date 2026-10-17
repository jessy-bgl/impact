<img align="left" width="80" height="80" src="assets/icon.png" alt="Impact">

# Impact

**Impact** est une application mobile basée sur les travaux de l'[ADEME](https://www.ademe.fr/) qui permet d'estimer, comprendre et diminuer son impact carbone personnel.

## Fonctionnalités

- Estimer son impact carbone en fonction de son mode de vie (modèle de calcul [Nos gestes climat](https://nosgestesclimat.fr/))
- Visualiser ses émissions carbone par catégories
- Comparer l'impact des éléments du quotidien (grâce à l'outil [Impact CO2](https://impactco2.fr/))
- Sélectionner des actions concrètes pour réduire ses émissions
- [A VENIR] Suivre l'évolution de son impact sur la durée

## Captures d'écran

[<img width=250 alt="Intro" src="docs/screenshots/mobile/mobile_1.png?raw=true">](docs/screenshots/mobile/mobile_1.png?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Emissions" src="docs/screenshots/mobile/mobile_2.png?raw=true">](docs/screenshots/mobile/mobile_2.png?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Profile" src="docs/screenshots/mobile/mobile_3.png?raw=true">](docs/screenshots/mobile/mobile_3.png?raw=true)&nbsp;&nbsp;

[<img width=250 alt="Actions" src="docs/screenshots/mobile/mobile_4.png?raw=true">](docs/screenshots/mobile/mobile_4.png?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Comparateur" src="docs/screenshots/mobile/mobile_5.png?raw=true">](docs/screenshots/mobile/mobile_5.png?raw=true)

## Notes techniques

### Setup

- installation de EAS CLI : `npm install -g eas-cli`
- login EAS : `eas login`

### Prebuild

Commande pour regénérer les fichiers android et iOS en fonction de la configuration de l'app (app.config.js) : `npx expo prebuild --clean`

### Run

- android : `npm run android` ou `npx expo run:android`

### Build - internal

- mobile - local : `eas build --platform android --profile production --local`
- mobile - EAS : `eas build --platform android --profile preview`

### Build - production

- mobile : `eas build --platform android`

### Deploy

- mobile : `eas submit --platform android`

### Mise à jour du modèle de calcul ADEME (`@incubateur-ademe/nosgestesclimat`)

#### 1. Mettre à jour la dépendance

Lire les [notes de version](https://github.com/incubateur-ademe/nosgestesclimat/releases) depuis la version installée, puis :

```bash
npm install @incubateur-ademe/nosgestesclimat@latest
```

Le paquet fournit `public/migration.json` : les renommages de questions décidés par l'ADEME, utile pour retrouver le nouveau nom d'une règle.

#### 2. Vérifier les règles cassées (erreur de compilation)

```bash
npm run typecheck
```

Les noms de règles sont typés contre `DottedName` : questions des écrans de profil (`profileSections.ts`), règles de calcul (`ademeCategoryRules.ts`), actions (`legacyActions.ts`). Une règle renommée ou supprimée fait échouer la compilation : corriger avant de continuer.

#### 3. Vérifier les questions manquantes ou obsolètes

```bash
node scripts/find-missing-questions.mjs   # questions du modèle absentes de l'app
node scripts/find-questions-to-remove.mjs # questions référencées dans l'app mais absentes du modèle
```

Consulter `questions-missing.txt` et `questions-to-remove.txt` pour ajuster les écrans de profil. `profil . âge` reste volontairement absent : l'utilisateur est toujours considéré majeur.

#### 4. Vérifier les calculs (tests de régression)

```bash
npm test
```

- `AdemeComputeEngine.test.ts` : les snapshots par persona détectent tout changement de valeur, et les tests de couverture vérifient que chaque catégorie calculée par l'app égale la valeur du modèle.
- `ademe-model-patch.test.ts` : liste les questions oui/non auxquelles l'app ajoute la valeur par défaut « non ».

Si les nouvelles valeurs sont attendues :

```bash
npm test -- --updateSnapshot
```

Inspecter le diff des fichiers `.snap` avant de committer : une variation sur un facteur d'émission est normale, une catégorie entière qui tombe à 0 ne l'est pas. Voir [TESTS.md](TESTS.md) pour le détail de la stratégie de test.

#### 5. Mettre à jour le contenu des actions

Les actions viennent du modèle (règles `actions . *`, identifiées par leur `meta.id`). Leurs textes « Je comprends l'enjeu », « J'agis » et « J'y gagne » n'y sont pas : ils sont extraits des fiches de [nosgestesclimat.fr/actions](https://nosgestesclimat.fr/actions).

```bash
node scripts/fetch-ngc-action-contents.mjs
```

Le script régénère `src/features/carbon-footprint/data/ngc-action-contents.json`.

Si l'ADEME remplace des actions, `legacyActions.ts` associe une ancienne action à son équivalent direct pour conserver l'état choisi par l'utilisateur (en cours, écartée).

#### 6. Tester la migration du profil

La migration des profils stockés est automatique au démarrage de l'app (`syncFootprintsProfileWithEngine`) :

- les clés supprimées du modèle et les valeurs devenues invalides (type changé, option renommée) sont purgées ;
- une section de profil dont les questions ont changé repasse « non complétée » : l'utilisateur doit y répondre de nouveau.

Vérifier manuellement que les écrans de profil et l'écran Actions s'affichent correctement après la mise à jour.
