import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },

    rules: {
      //...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prettier/prettier": "error",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
