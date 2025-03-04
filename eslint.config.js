import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "react/react-in-jsx-scope": "off", // Disable React import requirement
    },
  },
  pluginJs.configs.recommended,
  reactPlugin.configs.recommended, // Use "recommended" instead of "flat.recommended"
];
