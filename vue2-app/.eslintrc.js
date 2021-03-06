module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  globals: {
    T: true,
    AMap: true,
    echarts: true,
    UA: true,
    JSEncrypt: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0,
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 8,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    // 组件在template内必须使用 kebab-case 格式
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    // vue Html元素单标签关闭方式
    'vue/html-self-closing': [
      'error',
      {
        html: { normal: 'never', void: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],
  },
}
