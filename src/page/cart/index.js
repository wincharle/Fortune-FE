var nav = require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var util = require('util/util');
var cart = require('service/cart-service.js');

var cartTpl = `
{{#notEmpty}}
<div class="cart-header">
    <table class="cart-table">
        <tr>
            <th class="cart-cell cell-check">
                <label class="cart-label">
                    {{#allChecked}}
                    <input type="checkbox" class="cart-select-all" checked>
                    {{/allChecked}}
                    {{^allChecked}}
                    <input type="checkbox" class="cart-select-all">
                    {{/allChecked}}
                    <span>全选</span>
                </label>
            </th>
            <th class="cart-cell cell-info">商品信息</th>
            <th class="cart-cell cell-price">单价</th>
            <th class="cart-cell cell-count">数量</th>
            <th class="cart-cell cell-total">合计</th>
            <th class="cart-cell cell-opera">操作</th>
        </tr>
    </table>
</div>
<div class="cart-list">
    {{#cartProductVoList}}
    <table class="cart-table" data-product-id="{{productId}}">
        <tr>
            <td class="cart-cell cell-check">
                <label class="cart-label">
                    {{#productChecked}}
                    <input type="checkbox" class="cart-select" checked>
                    {{/productChecked}}
                    {{^productChecked}}
                    <input type="checkbox" class="cart-select">
                    {{/productChecked}}   
                </label>
            </td>
            <td class="cart-cell cell-img">
                <a href="./detail.html?productId={{productId}}" class="link">
                    <img src="{{imageHost}}{{productMainImage}}" alt="{{productName}}" class="p-img">
                </a>         
            </td>
            <td class="cart-cell cell-info">
                <a href="./detail.html?productId={{productId}}" class="link">{{productName}}</a>
            </td>
            <td class="cart-cell cell-price">￥{{productPrice}}</td>
            <td class="cart-cell cell-count">
                <span class="count-btn minus">-</span>
                <input type="text" class="count-input" value="{{quantity}}" data-max="{{productStock}}">
                <span class="count-btn plus">+</span>
            </td>
            <td class="cart-cell cell-total">￥{{productTotalPrice}}</td>
            <td class="cart-cell cell-opera">
                <span class="link cart-delete">删除</span>
            </td>
        </tr>
    </table>
    {{/cartProductVoList}}
</div>
<div class="cart-footer">
    <div class="select-con">
        <label class="cart-label">
            {{#allChecked}}
            <input type="checkbox" class="cart-select-all" checked>
            {{/allChecked}}
            {{^allChecked}}
            <input type="checkbox" class="cart-select-all">
            {{/allChecked}}
            <span>全选</span>
        </label>
    </div>
    <div class="delete-con">
        <span class="link delete-selected">
            <i class="fa fa-trash-o"></i>
            <span>删除选中</span>
        </span>
    </div>
    <div class="submit-con">
        <span>总价</span>
        <span class="submit-total">￥{{cartTotalPrice}}</span>
        <span class="btn btn-submit">去结算</span>
    </div>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="err-tip">
    <span>购物车为空</span>
    <a href="./index.html">立即去购物</a>
</p>
{{/notEmpty}}
`;

var page = {
    data: {

    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
        var _this = this;
        // 单个商品的选择
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError();
                })
            } else {
                cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError();
                })
            }
        });
        // 全选和取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            if ($this.is(':checked')) {
                cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError();
                })
            } else {
                cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError();
                })
            }
        });
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;

            if (type === 'plus') {
                if (currCount >= maxCount) {
                    util.errorTips('商品数量达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }

            cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (err) {
                _this.showCartError();
            });
        });

        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确认要删除该商品')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });

        $(document).on('click', '.delete-selected', function () {
            if (window.confirm('确认要删除选中的商品吗')) {
                var arrProductIds = [];
                var $selectedItem = $('.cart-select:checked');
                for(var i = 0; i < $selectedItem.length; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    util.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        $(document).on('click', '.btn-submit', function () {
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                util.errorTips('请选择商品后再提交');
            }
        });
    },
    loadCart: function () {
        var _this = this;
        cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (err) {
            _this.showCartError();
        });
    },
    renderCart: function (data) {
        this.filter(data);
        this.data.cartInfo = data;
        var cartHtml = util.renderHtml(cartTpl, data);
        $('.page-wrap').html(cartHtml);
        nav.loadCartCount();

    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tip">出错了</p>');
    },
    deleteCartProduct: function (productIds) {
        var _this = this;
        cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (err) {
            _this.showCartError();
        });
    }
}


$(function () {
    page.init();
})