var util = require('util/util');

var cart = {
    getCartCount: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject 
        });
    },

}

module.exports = cart;