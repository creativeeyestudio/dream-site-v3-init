module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:security/recommended",
    "plugin:prettier/recommended", // Doit être le dernier
  ],
  plugins: ["react", "jsx-a11y", "@typescript-eslint", "security", "prettier"],
  rules: {
    // Active Prettier comme erreur
    "prettier/prettier": ["error"],

    // Bonne pratique React
    "react/react-in-jsx-scope": "off", // plus nécessaire avec Next.js
    "react/jsx-uses-react": "off",

    // Typage TS
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",

    // Sécurité
    "security/detect-object-injection": "off", // désactivée car peut générer de faux positifs

    // Autres règles utiles
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
  },
};
