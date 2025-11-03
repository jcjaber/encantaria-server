module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Avisa sobre variáveis declaradas e não usadas
    "prefer-const": "error", // Garante que você use const sempre que possível
  },
};
