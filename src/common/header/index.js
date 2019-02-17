require('./style.css');
var util = require('util/util');

var header = {
    init: function () {
        this.bindEvent();
        return this;
    },
    bindEvent: function () {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        $('#search-input').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    onLoad: function () {
        var keyword = util.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            util.goHome();
        }
    }
};

module.exports = header.init();