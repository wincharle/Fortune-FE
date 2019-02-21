require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var addressModal = require('./address-modal/index');
var util = require('util/util');
var order = require('service/order-service.js');
var address = require('service/address-service.js');
var productListTpl = require('./product-list.tpl');
var addressListTpl = require('./address-list.tpl');

var page = {
    data: {
        selectedAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (err) {
                    util.errorTips(err);
                });
            } else {
                util.errorTips('请选择地址后再提交');
            }
        });
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            }, function (err) {
                util.errorTips(err);
            });
        });
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址吗?')) {
                address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList();
                }, function (err) {
                    util.errorTips(err);
                });
            }
        });
    },
    loadAddressList: function () {
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressHtml = util.renderHtml(addressListTpl, res);
            $('.address-con').html(addressHtml);
        }, function (err) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请重试</p>');
        });
    },
    loadProductList: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        order.getProductList(function (res) {
            var productHtml = util.renderHtml(productListTpl, res);
            $('.product-con').html(productHtml);
        }, function (err) {
            $('.product-con').html('<p class="err-tip">商品加载失败，请重试</p>');
        });
    },
    addressFilter: function(data) {
        if(this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for(var i = 0; i < data.list.length; i++) {
                if(data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if(!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    }
};


$(function () {
    page.init();
})