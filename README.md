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
