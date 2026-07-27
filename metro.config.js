const { getPostHogExpoConfig } = require("posthog-react-native/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = getPostHogExpoConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "mjs", "cjs", "svg"],
  unstable_conditionNames: ["browser", "require", "react-native"],
};

module.exports = wrapWithReanimatedMetroConfig(config);
