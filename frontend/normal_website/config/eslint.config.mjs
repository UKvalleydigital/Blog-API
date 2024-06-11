import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-empty": 1,
      "no-empty-function": 1,
      "indent": [1, 4]
    }
  }
];