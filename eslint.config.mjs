import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'

/** @type import("eslint").Linter.FLatConfig[] */
export default [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['*.cjs', '*.js'],
        languageOptions: {
            globals: { ...globals.node },
        },
    },
    {
        files: ['**/*.cjs', '**/*.mjs', '**/*.cjs', '*.cjs', '*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ['**/src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        ignores: ['node_modules', 'dist'],
    },
    eslintConfigPrettier,
]
