const { getPostHogExpoConfig } = require("posthog-react-native/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = getPostHogExpoConfig(__dirname);

const { transformer, resolver } = config;

// Native build artifacts Metro never needs to bundle. Watching them exhausts
// the inotify watch limit on Linux (ENOSPC: too many file watchers).
const nativeBuildArtifacts = new RegExp(
  [
    String.raw`.*/android/\.cxx/.*`,
    String.raw`.*/android/build/.*`,
    String.raw`.*/node_modules/\.ignored/.*`,
    String.raw`.*/ios/(build|Pods)/.*`,
  ].join("|"),
);

config.transformer = {
  ...transformer,
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "mjs", "cjs", "svg"],
  unstable_conditionNames: ["browser", "require", "react-native"],
  blockList: nativeBuildArtifacts,
};

module.exports = wrapWithReanimatedMetroConfig(config);
