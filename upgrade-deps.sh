# safe upgrade dependencies
npm i -g npm-check-updates
ncu -u
npm install
npx expo install --fix