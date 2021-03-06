/**
 * enhanced kissy template engine
 * @author yiminghe@gmail.com
 */
KISSY.add('xtemplate', function (S, XTemplate) {

    return XTemplate;

}, {
    requires: ['xtemplate/base', 'xtemplate/commands', 'xtemplate/sub-tpls']
});
/**
 * 2012-09-11 yiminghe@gmail.com
 *  - 对比 template
 *  优势
 *      - 不会莫名其妙报错（with）
 *      - 更多出错信息，直接给出行号
 *      - 更容易扩展 command,sub-tpl
 *      - 支持子模板
 *      - 支持作用域链
 *      - 内置 escapeHTML 支持
 *      - 支持预编译
 *   劣势
 *      - 不支持表达式
 *      - 不支持复杂比较操作
 *      - 不支持 js 语法
 *
 *  TODO:
 *      - 参考 velocity, 扩充 ast
 *          - Expression/ConditionalOrExpression/EqualityExpression/RelationalExpression...
 */