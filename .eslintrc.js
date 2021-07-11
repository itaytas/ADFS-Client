module.exports = {
    extends: [
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:typescript-sort-keys/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            modules: true
        },
        ecmaVersion: 6,
        project: './tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'typescript-sort-keys', 'sort-keys-fix'],
    rules: {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE']
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow'
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require'
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            }
        ],
        '@typescript-eslint/semi': ['error', 'always'],
        'arrow-parens': ['warn', 'as-needed'],
        'comma-dangle': ['error', 'never'],

        'eol-last': ['warn', 'always'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true
            }
        ],
        'import/prefer-default-export': 'off',
        'keyword-spacing': ['error', { after: true, before: true }],
        'max-len': [
            'error',
            {
                code: 110,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreUrls: true
            }
        ],
        'newline-before-return': 'warn',
        'no-extra-parens': 'warn',
        'no-console': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-trailing-spaces': 'warn',
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true,
                enforceInMethodNames: false
            }
        ],
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': 'warn',
        radix: ['error', 'as-needed'],
        semi: [2, 'always'],
        'sort-keys': 'error',
        'sort-keys-fix/sort-keys-fix': 'warn',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ]
    }
};
