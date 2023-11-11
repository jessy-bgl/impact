import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "jest-expo",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    coveragePathIgnorePatterns: ["common"],
  };
};
