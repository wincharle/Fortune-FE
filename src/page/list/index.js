require('common/nav/index.js');
require('common/footer/index.js');
require('common/header/index.js');
require('./style.css');
var util = require('util/util');
var product = require('service/product-service.js');
var Pagination = require('./pagination/index');

var listTpl = `
    {{#list}}
        <li class="p-item">
            <div class="p-img-con">
                <a class="link" href="./detail.html?productId={{id}}" target="_blank">
                    <img class="p-img" src="{{imageHost}}{{mainImage}}" alt="{{name}}" />
                </a>
            </div>
            <div class="p-price-con">
                <span class="p-price">￥{{price}}</span>
            </div>
            <div class="p-name-con">
                <a class="p-name" href="./detail.html?productId={{id}}" target="_blank">
                    {{name}}
                </a>
            </div>
        </li>
    {{/list}}
`;

var page = {
    data: {
        listParam: {
            keyword: util.getUrlParam('keyword') || '',
            categoryId: util.getUrlParam('categoryId') || '',
            orderBy: util.getUrlParam('orderBy') || 'default',
            pageNum: util.getUrlParam('pageNum') || 1,
            pageSize: util.getUrlParam('pageSize') || 2,
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        $('.sort-item').click(function () {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type' === 'price')) {
                $this.addClass('active').siblings().removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        })
    },
    loadList: function () {
        var listParam = this.data.listParam;
        var listHtml = '';
        var _this = this;
        $('.p-list-con').html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        product.getProductList(listParam, function (res) {
            listHtml = util.renderHtml(listTpl, {
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (err) {
            util.errorTips(err);
        })
    },
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
}


$(function () {
    page.init();
})