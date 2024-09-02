import baseConfig, { restrictEnvAccess } from "@emp/eslint-config/base";
import nextjsConfig from "@emp/eslint-config/nextjs";
import reactConfig from "@emp/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
