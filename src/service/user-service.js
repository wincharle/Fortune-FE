var util = require('util/util');

var user = {
    logout: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject 
        });
    },
    checkLogin: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject 
        });
    }
}

module.exports = user;