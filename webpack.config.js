const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const { getAliasesInTsConfig } = require("./utils");

module.exports = async function (env, argv) {
  // Set by expo-cli during `expo build:web`
  const isEnvProduction = env.mode === "production";

  // Create the default config
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    // resolve victory-native as victory for the Web app
    "victory-native": "victory",
  };

  const aliases = getAliasesInTsConfig();
  for (const alias in aliases) {
    const key = alias.substring(0, alias.length - 2);
    let value = aliases[alias][0];
    value = value.substring(2, value.length - 2);
    config.resolve.alias[key] = path.resolve(__dirname, value);
  }

  if (isEnvProduction) {
    config.plugins.push(
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      new WorkboxWebpackPlugin.InjectManifest({
        // eslint-disable-next-line no-undef
        swSrc: path.resolve(__dirname, "src/service-worker.js"),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /LICENSE/,
          /\.js\.gz$/,
          // Exclude all apple touch and chrome images because they're cached locally after the PWA is added.
          /(apple-touch-startup-image|chrome-icon|apple-touch-icon).*\.png$/,
        ],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // eslint-disable-next-line prettier/prettier
      }),
    );
  }

  return config;
};
