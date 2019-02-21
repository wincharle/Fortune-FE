var util = require('util/util');

var order = {
    getProductList: function (resolve, reject) {
        util.request({
            url: util.getServerUrl('/order/get_order_cart_product.do'),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    createOrder: function (orderInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/order/create.do'),
            data: orderInfo,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
}

module.exports = order;