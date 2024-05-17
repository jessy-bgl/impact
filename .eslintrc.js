module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["universe/native", "universe/web"],
  plugins: ["eslint-plugin-react-compiler"],
  rules: {
    "import/order": ["off", {}],
    "react-compiler/react-compiler": "error",
  },
};
