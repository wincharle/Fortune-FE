require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var navSide = require('common/nav-side/index.js');
var util = require('util/util');
var user = require('service/user-service.js');

var userInfoTpl = `
<div class="panel-title">个人中心</div>
<div class="panel-body">
    <div class="user-info">
        <div class="form-line">
            <span class="label">用户名：</span>
            <span class="text">{{username}}</span>
        </div>
        <div class="form-line">
            <span class="label">电 话：</span>
            <input class="input" id="phone" autocomplete="off" value="{{phone}}">
        </div>
        <div class="form-line">
            <span class="label">邮 箱：</span>
            <input class="input" id="email" autocomplete="off" value="{{email}}">
        </div>
        <div class="form-line">
            <span class="label">问 题：</span>
            <input class="input" id="question" autocomplete="off" value="{{question}}">
        </div>
        <div class="form-line">
            <span class="label">答 案：</span>
            <input class="input" id="answer" autocomplete="off" value="{{answer}}">
        </div>
        <a class="btn btn-submit">提交</a>
    </div>
</div>
`;

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var formData = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            };
            var validateResult = _this.formValidate(formData);
            if (validateResult.status) {
                user.updateUserInfo(formData, function (res, msg) {
                    util.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (err) {
                    util.errorTips(err);
                });
            } else {
                util.errorTips(validateResult.msg);
            }
        });
    },
    onLoad: function () {
        this.loadUserInfo();
        navSide.init({
            name: 'user-center'
        });
    },
    loadUserInfo: function (formData) {
        var userHtml = '';
        user.getUserInfo(function (res) {
            userHtml = util.renderHtml(userInfoTpl, res);
            $('.panel').html(userHtml);
        }, function (err) {
            util.errorTips(err);
        });
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
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
