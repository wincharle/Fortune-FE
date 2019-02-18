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
            <span class="text">{{phone}}</span>
        </div>
        <div class="form-line">
            <span class="label">邮 箱：</span>
            <span class="text">{{email}}</span>
        </div>
        <div class="form-line">
            <span class="label">问 题：</span>
            <span class="text">{{question}}</span>
        </div>
        <div class="form-line">
            <span class="label">答 案：</span>
            <span class="text">{{answer}}</span>
        </div>
        <a class="btn btn-submit" href="./user-center-update.html">编辑</a>
    </div>
</div>
`;

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadUserInfo();
        navSide.init({
            name: 'user-center'
        });
    },
    loadUserInfo: function () {
        var userHtml = '';
        user.getUserInfo(function (res) {
            userHtml = util.renderHtml(userInfoTpl, res);
            $('.panel').html(userHtml);
        }, function (err) {
            util.errorTips(err);
        });
    }
}

$(function () {
    page.init();
})
