import * as fs from "fs";
import type { Config } from "jest";

export default async (): Promise<Config> => {
  const jestConfig: Config = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    coveragePathIgnorePatterns: ["common"],
    moduleNameMapper: {},
  };

  // Retrieve aliases from tsconfig
  const rawTsConfig = fs.readFileSync("tsconfig.json", "utf8");
  const jsonAliases = JSON.parse(rawTsConfig).compilerOptions.paths;

  for (const alias in jsonAliases) {
    const key = "^" + alias.substring(0, alias.length - 1) + "(.*)$";
    let value = jsonAliases[alias][0];
    value = "<rootDir>" + value.substring(1, value.length - 1) + "$1";
    jestConfig.moduleNameMapper = {
      ...jestConfig.moduleNameMapper,
      [key]: value,
    };
  }

  return jestConfig;
};
