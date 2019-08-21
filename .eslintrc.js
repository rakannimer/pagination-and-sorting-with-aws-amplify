module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
    "cypress/globals": true
  },
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
  plugins: ["@typescript-eslint", "react", "jest", "cypress"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off"
  }
};
