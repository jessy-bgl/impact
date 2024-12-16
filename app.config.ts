import { ExpoConfig } from "expo/config";
import "ts-node/register";

const config: ExpoConfig = {
  githubUrl: "https://github.com/jessy-bgl/impact",
  name: "Impact",
  slug: "impact",
  version: "1.1.1",
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
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.impactech.impact",
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  experiments: {
    tsconfigPaths: true,
    baseUrl: "/impact",
  },
  extra: {
    eas: {
      projectId: "e2d24387-b1d5-4c95-b5a8-42f48c62af22",
    },
  },
  owner: "jessy-bgl",
};

export default config;
