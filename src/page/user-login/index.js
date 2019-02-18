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
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
        };
        var validateResult = this.formValidate(formData);
        if(validateResult.status) {
            user.login(formData, function(res) {
                window.location.href = util.getUrlParam('redirect') || './index.html';
            }, function(err) {
                $('.error-item').show().find('.error-msg').text(err);
            });
        } else {
            $('.error-item').show().find('.error-msg').text(validateResult.msg);
        }
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!util.validate(formData.username, 'required')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if(!util.validate(formData.password, 'required')) {
            result.msg = '密码不能为空';
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