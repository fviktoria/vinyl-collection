module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals", // Recommended Next.js rules
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // TypeScript support
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended" // Integrates Prettier
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    "react/jsx-no-duplicate-props": "warn",
    "react/prop-types": "off", // Not needed with TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};