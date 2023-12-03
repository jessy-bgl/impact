module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["universe/native", "universe/web"],
  rules: {
    "import/order": ["off", {}],
  },
};
