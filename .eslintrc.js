module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    'vue/setup-compiler-macros': true
  },
  globals: {
    log: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-dollar-listeners-api': 'off',
    'no-unused-vars': 'off',
    'vue/no-v-html': 'off',

    // 与 Prettier 相关的规则
    'prettier/prettier': [
      'error',
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": true,
  "endOfLine": "auto",
  "embeddedLanguageFormatting": "auto"
}

    ],

    // 禁用可能冲突的 Vue 规则，让 Prettier 处理
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',

    // 确保与 Prettier 的分号规则一致
    semi: ['error', 'never'],
    'no-extra-semi': 'error'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // 为 Vue 文件单独设置规则
        indent: 'off', // 让 Prettier 处理缩进
        'vue/script-indent': 'off' // 禁用 script 缩进规则
      }
    }
  ]
}
