import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import eslintPluginSecurity from 'eslint-plugin-security';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Base configuration
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintPluginSecurity.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    ignores: ["dist/", "node_modules/", ".astro/", "*.config.*", ".*rc.*"],
  },
  {
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
      // Override specific rules if needed
      "astro/no-set-html-directive": "error",
      "security/detect-object-injection": "off", // Often false positive in modern frontend
    }
  }
];
