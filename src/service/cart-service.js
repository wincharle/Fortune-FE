var util = require('util/util');

var cart = {
    getCartCount: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject 
        });
    },
    addToCart: function(productInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject 
        });
    },
    getCartList: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject 
        });
    },
    selectProduct: function(productId, resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject 
        });
    },
    unselectProduct: function(productId, resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject 
        });
    },
    selectAllProduct: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject 
        });
    },
    unselectAllProduct: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject 
        });
    },
    updateProduct: function(productInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject 
        });
    },
    deleteProduct: function(productIds, resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/delete.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject 
        });
    }
}

module.exports = cart;