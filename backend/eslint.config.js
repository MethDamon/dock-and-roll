// eslint.config.js
import { defineConfig } from "eslint-define-config";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";

export default [
  defineConfig({
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      import: eslintPluginImport, // Define the import plugin as an object
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  }),
  defineConfig({
    files: ["src/**/*.{ts,tsx}"], // Specify TypeScript files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      import: eslintPluginImport, // Include the import plugin as an object here as well
    },
    rules: {
      // Add TypeScript-specific rules here if needed
    },
  }),
];
