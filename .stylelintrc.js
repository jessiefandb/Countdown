module.exports = {
  plugins: ['stylelint-scss'],

  extends: ['stylelint-config-standard'],

  rules: {
    // 指定 alpha 值的百分比或数字表示法
    'alpha-value-notation': 'number',

    // 忽略未知注释 主要是处理 !default
    'annotation-no-unknown': [
      true,
      {
        ignoreAnnotations: ['default']
      }
    ],

    // 忽略 @mixin @include @extend @apply
    // 如果有其他 at-rule-no-unknow 规则, 可以设置为 null
    'at-rule-no-unknown': [
      null,
      {
        'ignoreAtRules': ['mixin', 'include', 'extend', 'apply', 'if', 'use', 'import', 'for', 'each', 'else']
      }
    ],

    // 取消 为颜色函数指定现代或传统符号 rgba or rgb
    'color-function-notation': null,

    // 颜色值取消大小写的限制
    'color-hex-case': null,

    // 为十六进制颜色指定短符号或长符号
    // 长符号
    'color-hex-length': 'long',

    // /**/
    'comment-no-empty': true,

    // 取消 在自定义属性之前要求空行
    'custom-property-empty-line-before': null,

    // 取消禁止使用可以缩写却不缩写的属性 flex
    'declaration-block-no-redundant-longhand-properties': null,

    // 允许使用未知方法 px2rem
    'function-no-unknown': null,

    // 为规则指定字符串或 URL 表示法 @import
    'import-notation': 'string',

    // 基于 bootstrap 的变量的复杂度, 不限制单行长度
    'max-line-length': null,

    // 允许出现空文件
    'no-empty-source': null,

    // 取消禁止无效的仓位@import规则
    'no-invalid-position-at-import-rule': null,

    // 对于小于 1 的小数，不允许前导零
    'number-leading-zero': 'never',

    // 限制小数位数
    'number-max-precision': null,

    // 样式选择器 使用 kebab-case 规则, 同时兼容 BEM 规范
    'selector-class-pattern': [
			'^([a-z][a-z0-9]*)((-|--|__)[a-z0-9]+)*$',
			{
				message: (selector) => `Expected class selector "${selector}" to be kebab-case`,
			},
		],

    // 在字符串周围指定单引号或双引号
    'string-quotes': 'double',

    // 取消为关键字值指定小写或大写 currentColor
    'value-keyword-case': null,
  }
};