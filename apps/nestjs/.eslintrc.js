/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".dist/**"],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
