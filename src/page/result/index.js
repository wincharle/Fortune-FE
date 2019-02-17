require('common/nav-simple/index.js');
require('common/footer/index.js');
require('./style.css');
var util = require('util/util');

$(function () {
    var type = util.getUrlParam('type') || 'default';
    if (type === 'default') {
        $('.result-title').text('恭喜您，操作成功');
    } else if (type === 'register') {
        $('.result-title').text('恭喜您，注册成功');
    }
});