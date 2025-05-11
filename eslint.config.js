// @ts-check
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { config as tsConfig, configs as tsConfigs } from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import importX from "eslint-plugin-import-x";
import unicorn from "eslint-plugin-unicorn";

export default tsConfig(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      tsConfigs.strictTypeChecked,
      tsConfigs.stylisticTypeChecked,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      importX.flatConfigs.react,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      // @ts-ignore
      reactCompiler.configs.recommended,
      unicorn.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import-x/resolver": {
        typescript: true,
      },
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Adding a stylistic rule for type imports.
      // Unfortunately, this is somehow not part of `plugin:@typescript-eslint/stylistic-type-checked`.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // Make an exception for this rule for JSX attributes,
      // e.g., <form onSubmit={someAsyncSubmitHandler}>...</form>, which is now allowed.
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      // Enforce a consisten function type for function components
      "react/function-component-definition": "error",

      // Enforce self-closing components
      "react/self-closing-comp": "error",

      // Require destructuring and symmetric naming of `useState` hook value and setter variables
      "react/hook-use-state": "error",

      // Disallow problematic leaked values from being rendered
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce"] }],

      // Be explicit about the props which will be passed to components
      "react/jsx-props-no-spreading": "error",

      // Disallow to define a prop and not use it
      "react/no-unused-prop-types": "error",

      // Disallow the use of `dangerouslySetInnerHTML`
      "react/no-danger": "error",

      // Enforce proper props naming
      "react/boolean-prop-naming": "warn",

      // Enforce proper handler naming
      "react/jsx-handler-names": "warn",

      // This rule is not needed with TypeScript
      "react/prop-types": "off",

      // Configure allowed abbreviations
      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: [
            /db/i,
            /env/i,
            /props/i,
            /ref/i,
            /fn/i,
            /src/i,
            /err/i,
            /utils/i,
          ],
        },
      ],

      // Ensure shorter, consistent, safer regex
      // Probably we should move to `eslint-plugin-regex`: https://github.com/sindresorhus/eslint-plugin-unicorn/pull/2443
      "unicorn/better-regex": "error",

      // Setup of `unsused-imports` plugin
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Enforce a consistent import order
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // npm packages
            "internal", // paths aliased in tsconfig
            "parent", // parent directory imports
            "sibling", // same directory imports
            "index", // index of same directory
            "object", // object imports
            "type", // type imports
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "{react,react-dom,react-dom/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
        },
      ],

      // Prevent circular dependencies
      "import-x/no-cycle": [
        "error",
        {
          maxDepth: Infinity,
          ignoreExternal: true,
        },
      ],

      // Remove unnecessary path segments
      "import-x/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true,
        },
      ],

      // Prevent importing the same module in multiple places
      "import-x/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      // Ensure all imports appear before other statements
      "import-x/first": "error",

      // Ensure new line after imports
      "import-x/newline-after-import": "error",

      // Prevent importing packages through relative paths
      "import-x/no-relative-packages": "error",

      // Ensure consistent use of file extension
      "import-x/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],

      // This will be ensured by TypeScript
      "import-x/no-unresolved": "off",

      // Prevent importing dev dependencies in production code
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "*.config.{js,ts}",
            "tests/**/*.{js,ts,tsx}",
            "**/*.test.{js,ts,tsx}",
          ],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },
);
