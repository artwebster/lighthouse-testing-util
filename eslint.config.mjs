import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx}']
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs'
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				$: 'readonly'
			}
		}
	},
	{
		ignores: ['./node_modules', './client/node_modules', './server/node_modules', './server/dist']
	},
	pluginJs.configs.recommended,
	tseslint.configs.recommended,
	{
		rules: {
			curly: 1,
			'@typescript-eslint/explicit-function-return-type': [0],
			'@typescript-eslint/no-explicit-any': [0],
			'@typescript-eslint/no-var-requires': [0],
			'@typescript-eslint/no-this-alias': 'warn',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'ordered-imports': [0],
			'object-literal-sort-keys': [0],
			'max-len': [1, 120],
			'new-parens': 1,
			'no-bitwise': 1,
			'no-cond-assign': 1,
			'no-trailing-spaces': 0,
			'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

			// possible errors
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',

			// best practices
			eqeqeq: 'warn',
			'no-alert': 'warn',
			'no-else-return': 'error',
			'no-extra-bind': 'error',
			'no-floating-decimal': 'error',
			'no-implicit-coercion': 'error',
			'no-multi-spaces': 'error',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

			// variables
			'no-shadow': 'warn',
			'no-undef': 'warn',

			// stylistic
			'array-bracket-spacing': ['error', 'never'],
			'block-spacing': 'error',
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			camelcase: ['warn', { properties: 'never' }],
			'comma-dangle': ['error', 'never'],
			'eol-last': 'error',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],

			// es6
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-var': 'warn',
			'prefer-const': ['warn', { destructuring: 'all' }],
			'template-curly-spacing': ['error', 'never'],
			'object-shorthand': ['error', 'always'],
			'no-async-promise-executor': 'warn',
			'no-useless-catch': 'warn',
			'no-redeclare': 'warn'
		}
	}
);
