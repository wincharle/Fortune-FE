require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var navSide = require('common/nav-side/index.js');
var util = require('util/util');
var user = require('service/user-service.js');


var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var formData = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            };
            var validateResult = _this.formValidate(formData);
            if (validateResult.status) {

                user.updatePassword({
                    passwordOld: formData.password,
                    passwordNew: formData.passwordNew
                }, function (res, msg) {
                    util.successTips(msg);
                }, function (err) {
                    util.errorTips(err);
                });
            } else {
                util.errorTips(validateResult.msg);
            }
        });
    },
    onLoad: function () {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!util.validate(formData.password, 'required')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得小于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function () {
    page.init();
})
