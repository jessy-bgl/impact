import { ExpoConfig } from "expo/config";
import { coerce } from "semver";
import "ts-node/register";

import pkg from "./package.json";

const pkgVersion = coerce(pkg.version)!;

const config: ExpoConfig = {
  owner: "jessy-bgl",
  githubUrl: "https://github.com/jessy-bgl/impact",
  name: "Impact",
  slug: "impact",
  version: pkgVersion.version,
  extra: {
    eas: { projectId: "e2d24387-b1d5-4c95-b5a8-42f48c62af22" },
  },
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  plugins: [
    [
      "expo-splash-screen",
      {
        backgroundColor: "#eeeeee",
        image: "./assets/adaptive-icon.png",
        imageWidth: 200,
      },
    ],
  ],
  assetBundlePatterns: ["**/*"],
  experiments: {
    tsconfigPaths: true,
    baseUrl: "/impact",
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  android: {
    package: "com.impactech.impact",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  ios: {
    bundleIdentifier: "com.impactech.impact",
    supportsTablet: true,
  },
};

export default config;
