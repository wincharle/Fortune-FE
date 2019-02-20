var util = require('util/util');

var product = {
    getProductList: function (listParam, resolve, reject) {
        util.request({
            url: util.getServerUrl('/product/list.do'),
            data: listParam,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function (productId, resolve, reject) {
        util.request({
            url: util.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
}

module.exports = product;