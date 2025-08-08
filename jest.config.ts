import type { Config } from "jest";

import { getAliasesInTsConfig } from "./utils";

export default async (): Promise<Config> => {
  const jestConfig: Config = {
    preset: "jest-expo",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    coveragePathIgnorePatterns: ["common"],
    moduleNameMapper: {},
  };

  const aliases = getAliasesInTsConfig();
  for (const alias in aliases) {
    const key = "^" + alias.substring(0, alias.length - 1) + "(.*)$";
    let value = aliases[alias][0];
    value = "<rootDir>" + value.substring(1, value.length - 1) + "$1";
    jestConfig.moduleNameMapper = {
      ...jestConfig.moduleNameMapper,
      [key]: value,
    };
  }

  return jestConfig;
};
