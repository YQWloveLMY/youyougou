//表单验证插件
import Vue from "vue";
//引入表单验证插件
import VeeValidate from "vee-validate";
//引入中文
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证规则
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages, //中文提示信息
        is: field => `${field}必须与登录密码相同`, //修改内置规则的message，让确认密码和密码相同
    },
    attributes: {
        //给校验的field属性名映射中文名称,当遇见这个字段就显示为中文
        phone: "手机号",
        code: "验证码",
        password: "密码",
        passwordd1: "确认密码",
        agree: "协议",
    },
});
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend("agree", {
    validate: value => {
        return value;
    },
    getMessage: field => "请您阅读并同意" + field,
});
