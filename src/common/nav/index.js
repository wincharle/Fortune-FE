require('./style.css');
var util = require('util/util');
var user = require('service/user-service.js');
var cart = require('service/cart-service');

var nav = {
    init: function () {
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function () {
        $('.js-login').click(function () {
            util.doLogin();
        });
        $('.js-register').click(function () {
            window.location.href = './register.html';
        });
        $('.js-logout').click(function () {
            user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                util.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function () {
        user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (errMsg) {
        });
    },
    loadCartCount: function () {
        cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();