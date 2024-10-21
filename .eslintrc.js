module.exports = {
  root: true,
  env: { node: true, browser: true, "jest/globals": true },
  extends: ["expo", "prettier", "eslint:recommended"],
  plugins: ["prettier", "jest"],
  rules: {
    "import/order": ["off", {}],
    // 'prettier/prettier': 'error',
  },
};
