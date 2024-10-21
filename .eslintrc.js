module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-extra-boolean-cast': 'off',
    // array.map 等方法取消强制 return
    // 麻烦 && 箭头函数缩写的冲突
    'array-callback-return': 'off',
		'no-new': 'warn'
  }
}