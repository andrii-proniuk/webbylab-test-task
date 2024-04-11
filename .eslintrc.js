module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: ['plugin:prettier/recommended', 'plugin:import/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'quotes': ['error', 'single'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'max-lines-per-function': ['warn', 50],
    'no-param-reassign': ['error', {props: false}],
    'max-len': ['error', {code: 120, ignorePattern: '^import .*', ignoreUrls: true}],
    'complexity': ['error', 5],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['warn', 3],
    'max-depth': ['error', 4],
    'no-multiple-empty-lines': ['error', {max: 1}],
    'no-console': 'warn',
    'useTabs': 0,
    'no-return-await': 'error',
    'padding-line-between-statements': ['error', {blankLine: 'always', prev: '*', next: 'return'}],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
