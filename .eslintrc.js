module.exports = {
  env: {
    browser: true,
    es6: true
  },
  //   extends: "eslint:recommended",
  //   globals: {
  //     Atomics: "readonly",
  //     SharedArrayBuffer: "readonly"
  //   },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off"
  }
};
