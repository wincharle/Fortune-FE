var util = require('util/util');

var address = {
    getAddressList: function (resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    save: function (addressInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    update: function (addressInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    deleteAddress: function (shippingId, resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    getAddress: function (shippingId, resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
}

module.exports = address;