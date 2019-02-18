require('common/nav-simple/index.js');
require('common/footer/index.js');
require('./style.css');
var util = require('util/util');
var user = require('service/user-service.js');

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            if(!username) {
                return;
            }
            user.checkUsername(username, function (res) {
                $('.error-item').hide().find('.error-msg').text('');
            }, function (err) {
                $('.error-item').show().find('.error-msg').text(err);
            })
        });
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        };
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
            }, function (err) {
                $('.error-item').show().find('.error-msg').text(err);
            });
        } else {
            $('.error-item').show().find('.error-msg').text(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!util.validate(formData.username, 'required')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!util.validate(formData.password, 'required')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if (!util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!util.validate(formData.question, 'required')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!util.validate(formData.answer, 'required')) {
            result.msg = '密码提示问题答案不能为空';
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