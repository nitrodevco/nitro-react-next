import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import path from 'path';
import ts from 'typescript-eslint';

export default ts.config(
    {
        extends: [ 
            js.configs.recommended,
            ...ts.configs.recommended,
            ...tailwind.configs['flat/recommended']
        ],
        files: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
        ignores: [ 'node_modules', 'dist', 'public' ],
        languageOptions: {
            ecmaVersion: 'latest'
        },
        settings: {
            react: {
                version: '19.0.0',
            },
            tailwindcss: {
                config: path.join(import.meta.dirname, 'tailwind.config.mjs')
            }
        },
        plugins: {
            'react': reactPlugin,
            'react-compiler': reactCompiler,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...reactRefreshPlugin.configs.recommended.rules,
            'react-compiler/react-compiler': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'indent': [
                'error',
                4,
                {
                    'SwitchCase': 1
                }
            ],
            'no-multi-spaces': [
                'error'
            ],
            'no-trailing-spaces': [
                'error',
                {
                    'skipBlankLines': false,
                    'ignoreComments': true
                }
            ],
            'linebreak-style': [
                'off'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'always'
            ],
            'brace-style': [
                'error',
                'allman'
            ],
            'array-bracket-spacing': [
                'error',
                'always'
            ],
            'object-curly-spacing': [
                'error',
                'always'
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-one-expression-per-line': 'error',
        },
    }
);
