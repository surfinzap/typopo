module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true,
		mocha: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parser: 'babel-eslint',
	},
	plugins: ['prettier'],
	rules: {},
}
