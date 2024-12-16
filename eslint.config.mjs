import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules/", "**/web-build/", "**/dist/"],
  },
  ...compat.extends("expo", "prettier", "eslint:recommended"),
  {
    plugins: {
      prettier,
      jest,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...jest.environments.globals.globals,
      },
    },

    rules: {
      "import/order": ["off", {}],
    },

    ignores: ["**/node_modules/", "**/web-build/", "**/dist/"],
  },
];
