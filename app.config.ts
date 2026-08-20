import { ExpoConfig } from "expo/config";
import "ts-node/register";

import pkg from "./package.json";

const pkgVersion = pkg.version;

// baseUrl is the GitHub Pages subpath for the PWA. It must not reach a native
// build: export:embed prefixes the asset destination with it, so assets land in
// Impact.app/impact/, which collides with the Impact binary on macOS's
// case-insensitive filesystem and fails the Xcode bundle phase with ENOTDIR.
const isWebExport = process.env.EXPO_WEB_EXPORT === "1";

const config: ExpoConfig = {
  owner: "jessy-bgl",
  githubUrl: "https://github.com/jessy-bgl/impact",
  name: "Impact",
  slug: "impact",
  version: pkgVersion,
  extra: {
    eas: { projectId: "e2d24387-b1d5-4c95-b5a8-42f48c62af22" },
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST || "https://eu.i.posthog.com",
  },
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  plugins: [
    "expo-font",
    "expo-image",
    "expo-status-bar",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#eeeeee",
        image: "./assets/adaptive-icon.png",
        imageWidth: 200,
      },
    ],
    [
      "expo-asset",
      {
        assets: ["./assets/images"],
      },
    ],
    [
      "posthog-react-native/expo",
      {
        uploadNativeSymbols: true,
        // Rebuilding an unchanged JS bundle under a new versionCode yields the
        // same chunk id, so the symbol set already exists in PostHog and the
        // upload 400s (release_id_mismatch, then content_hash_mismatch),
        // failing the Gradle build. Skip those instead of failing.
        skipOnConflict: true,
      },
    ],
  ],
  assetBundlePatterns: ["**/*"],
  experiments: {
    tsconfigPaths: true,
    ...(isWebExport ? { baseUrl: "/impact" } : {}),
    reactCompiler: true,
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
  },
  ios: {
    bundleIdentifier: "com.impactech.impact",
    supportsTablet: true,
    config: { usesNonExemptEncryption: false },
  },
};

export default config;
