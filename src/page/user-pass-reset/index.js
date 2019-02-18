require('common/nav-simple/index.js');
require('common/footer/index.js');
require('./style.css');
var util = require('util/util');
var user = require('service/user-service.js');

var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    loadStepUsername: function () {
        $('.step-username').show();
    },
    loadStepQuestion: function () {
        $('.error-item').hide().find('.error-msg').text('');
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    loadStepPassword: function () {
        $('.error-item').hide().find('.error-msg').text('');
        $('.step-question').hide().siblings('.step-password').show();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();

                }, function (err) {
                    $('.error-item').show().find('.error-msg').text(err);
                })
            } else {
                $('.error-item').show().find('.error-msg').text('请输入用户名');
            }
        });
        $('#submit-answer').click(function () {
            var answer = $.trim($('#answer').val());
            if (answer) {
                user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();

                }, function (err) {
                    $('.error-item').show().find('.error-msg').text(err);
                })
            } else {
                $('.error-item').show().find('.error-msg').text('请输入密码提示问题的答案');
            }
        });
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if (password && password >=6) {
                user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';

                }, function (err) {
                    $('.error-item').show().find('.error-msg').text(err);
                })
            } else {
                $('.error-item').show().find('.error-msg').text('请输入不少于6位的新密码');
            }
        });
    }
}

$(function () {
    page.init();
})