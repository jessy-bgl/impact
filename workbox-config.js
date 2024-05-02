module.exports = {
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,ico,html,json}"],
  swDest: "dist/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
