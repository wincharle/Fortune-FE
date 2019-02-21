require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var util = require('util/util');
var product = require('service/product-service.js');
var cart = require('service/cart-service.js');

var detailTpl = `
<div class="intro-wrap">
<div class="p-img-con">
    <div class="main-img-con">
        <img class="main-img" src="{{imageHost}}{{mainImage}}" alt="{{name}}">
    </div>
    <ul class="p-img-list">
        {{#subImages}}
        <li class="p-img-item">
            <img class="p-img" src="{{imageHost}}{{.}}" alt="{{name}}">
        </li>
        {{/subImages}}
    </ul>
</div>
<div class="p-info-con">
    <h1 class="p-name">{{name}}</h1>
    <p class="p-subtitle">{{subtitle}}</p>
    <div class="p-info-item p-price-con">
        <span class="label">价格:</span>
        <span class="info">￥{{price}}</span>
    </div>
    <div class="p-info-item">
        <span class="label">库存:</span>
        <span class="info">{{stock}}</span>
    </div>
    <div class="p-info-item p-count-con">
        <span class="label">数量:</span>
        <input type="text" class="p-count" value="1" readonly>
        <span class="p-count-btn plus">+</span>
        <span class="p-count-btn minus">-</span>
    </div>
    <div class="p-info-item">
        <a class="btn cart-add">加入购物车</a>
    </div>
</div>
</div>
<div class="detail-wrap">
<div class="detail-tab-con">
    <ul class="tab-list">
        <li class="tab-item active">详细描述</li>
    </ul>
</div>
<div class="detail-con">
    {{{detail}}}
</div>
</div>
`;

var page = {
    data: {
        productId: util.getUrlParam('productId') || ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        if (!this.data.productId) {
            util.goHome();
        }
        this.loadDetail();
    },
    loadDetail: function () {
        var html = '';
        var _this = this;
        $('.page-wrap').html('<div class="loading"></div>')
        product.getProductDetail(this.data.productId, function (res) {
            _this.data.detailInfo = res;
            html = util.renderHtml(detailTpl, res);
            $('.page-wrap').html(html);
        }, function (err) {
            $('.page-wrap').html('<p class="err-tip">找不到商品</p>');
        });
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('mouseenter', '.p-img-item', function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.p-count-btn', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount = $('.p-count');
            var currCount = parseInt($pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;

            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        $(document).on('click', '.cart-add', function () {
            cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(err) {
                util.errorTips(err);
            });
        });
    }
}

$(function () {
    page.init();
})