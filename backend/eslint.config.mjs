import eslintConfig from '@repo/eslint-config';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';


// falta incluir la config de jest
export default [
  {
    name: 'eslint/defaults/rules',
    ...eslint.configs.recommended,
    files: ['**/*.ts', '**/*.tsx'],
  },
  tseslint.configs.eslintRecommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  //...tseslint.configs.strictTypeChecked.map(config => ({
  //  ...config,
  //  files: ["**/*.ts", "**/*.tsx"]
  //})),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    // global ignores
    name: '@repo/eslint-config/ignores',
    ignores: [
      'dist/**',
      'node_modules/**',
      '.git/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.mjs',
    ],
  },
  {
    name: '@repo/eslint-config/base',
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      semi: ['error', 'always'], // deprecated
      //"no-unused-vars": "error",
      'no-extra-semi': 'error', // deprecated
      'no-undef': 'error',
      'no-console': 'error',
      eqeqeq: 'error',
      camelcase: 'error',
      quotes: [
        // deprecated
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
  },{
    name: "eslint/defaults/rules",
    ...eslint.configs.recommended,
    files: ["**/*.ts", "**/*.tsx"],
  },
  tseslint.configs.eslintRecommended,
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    // global ignores
    name: '@repo/eslint-config/ignores',
    ignores: ['dist/**', 'node_modules/**', '.git/**', "**/*.config.js", "**/*.config.ts", "**/*.config.mjs"],
  },
  {
    name: '@repo/eslint-config/base',
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }
      ],
      "semi": ["error", "always"], // deprecated
      //"no-unused-vars": "error",
      "no-extra-semi": "error", // deprecated
      "no-undef": "error",
      "no-console": "error",
      "eqeqeq": "error",
      "camelcase": "error",
      "quotes": [ // deprecated
        "error",
        "single",
        { "avoidEscape": true, "allowTemplateLiterals": true }
      ]
    },
  },
  {
    name: 'lms-server/ignores',
    ignores: ['fileTransformer.js'],
  },
  {
    name: 'lms-server',
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
      },
      parserOptions: {
        projectService: true,
        //project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ...prettierConfigRecommended,
    name: 'prettier-eslint/recommended',
  },
  {
    name: 'rtchat/eslint-config/prettier',
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];
