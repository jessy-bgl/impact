<img align="left" width="80" height="80" src="assets/icon.png" alt="Impact">

# Impact

**Impact** est une application Web (PWA) et Mobile basée sur les travaux de l'[ADEME](https://www.ademe.fr/) qui permet d'estimer, comprendre et diminuer son impact carbone personnel.

## Fonctionnalités

- Estimer son impact carbone en fonction de son mode de vie (modèle de calcul [Nos gestes climat](https://nosgestesclimat.fr/))
- Visualiser ses émissions carbone par catégories
- Comparer l'impact des éléments du quotidien (grâce à l'outil [Impact CO2](https://impactco2.fr/))
- Sélectionner des actions concrètes pour réduire ses émissions
- [A VENIR] Suivre l'évolution de son impact sur la durée

## Captures d'écran

[<img width=250 alt="Emissions" src="docs/screenshots/mobile/mobile_1.jpg?raw=true">](docs/screenshots/mobile/mobile_1.jpg?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Profile" src="docs/screenshots/mobile/mobile_2.jpg?raw=true">](docs/screenshots/mobile/mobile_2.jpg?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Profile" src="docs/screenshots/mobile/mobile_3.jpg?raw=true">](docs/screenshots/mobile/mobile_3.jpg?raw=true)&nbsp;&nbsp;

[<img width=250 alt="Actions" src="docs/screenshots/mobile/mobile_4.jpg?raw=true">](docs/screenshots/mobile/mobile_4.jpg?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Actions" src="docs/screenshots/mobile/mobile_5.jpg?raw=true">](docs/screenshots/mobile/mobile_5.jpg?raw=true)&nbsp;&nbsp;
[<img width=250 alt="Comparateur_Chauffage" src="docs/screenshots/mobile/mobile_6.jpg?raw=true">](docs/screenshots/mobile/mobile_6.jpg?raw=true)

## Notes techniques

### Setup

- installation de EAS CLI : `npm install -g eas-cli`
- login EAS : `eas login`

### Prebuild

Commande pour regénérer les fichiers android et iOS en fonction de la configuration de l'app (app.config.js) : `npx expo prebuild --clean`

### Run

- web : `npm run web`
- android : `npm run android`

### Build - internal

- mobile - local : `npx expo run:android` ou `eas build --platform android --profile production --local`
- mobile - EAS : `eas build --platform android --profile preview`

### Build - production

- mobile : `eas build --platform android`
- web : `npm run build:web`.

Pour exécuter la version de production web en local, retirer la partie "/impact/" de la source du dernier script dans index.html, puis lancer `npx serve -s dist`.

### Deploy

- mobile : `eas submit --platform android`
- web : `npm run deploy:web`

### Mise à jour du modèle de calcul ADEME (`@incubateur-ademe/nosgestesclimat`)

#### 1. Mettre à jour la dépendance

```bash
npm install @incubateur-ademe/nosgestesclimat@latest
```

#### 2. Vérifier les règles de calcul cassées (erreur de compilation)

```bash
npm run typecheck
```

Les noms de règles utilisés dans `AdemeComputeEngine` sont typés contre `DottedName`. Si une règle a été renommée ou supprimée dans le modèle, TypeScript signale une erreur ici — corriger avant de continuer.

#### 3. Vérifier les questions manquantes ou obsolètes

```bash
node scripts/find-missing-questions.mjs   # questions du modèle absentes de l'app
node scripts/find-questions-to-remove.mjs # questions référencées dans l'app mais absentes du modèle
```

Consulter `questions-missing.txt` et `questions-to-remove.txt` pour décider des ajustements à apporter aux écrans de profil.

#### 4. Vérifier les calculs (tests de régression)

```bash
npm test -- --testPathPattern=AdemeComputeEngine
```

Les snapshots par persona détectent tout changement de valeur calculée. Si des snapshots échouent et que les nouvelles valeurs sont attendues :

```bash
npm test -- --updateSnapshot
```

Inspecter le diff du fichier `.snap` avant de committer — une variation sur un facteur d'émission est normale, une catégorie entière qui tombe à 0 ne l'est pas. Voir [TESTS.md](TESTS.md) pour le détail de la stratégie de test.

#### 5. Tester la migration du profil

La migration des profils stockés est automatique au démarrage de l'app (`syncFootprintsProfileWithEngine`) : les clés supprimées du modèle et les valeurs devenues invalides (type changé, option renommée) sont purgées silencieusement. Vérifier manuellement que les écrans de profil affichent correctement les questions après la mise à jour.
