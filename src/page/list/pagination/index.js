require('./style.css');
var util = require('util/util');


var paginationTpl = `
<div class="pg-content">
    {{#pageArray}}
    {{#disabled}}
    <span class="pg-item disabled" data-value={{value}}>{{name}}</span>
    {{/disabled}}
    {{^disabled}}
        {{#active}}
        <span class="pg-item active" data-value={{value}}>{{name}}</span>
        {{/active}}
        {{^active}}
        <span class="pg-item" data-value={{value}}>{{name}}</span>
        {{/active}}
    {{/disabled}}
    {{/pageArray}}
    <span class="pg-total">{{pageNum}} / {{pages}}</span>
</div>
`;

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }

        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;

    });
}

Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    if(!(this.option.container instanceof jQuery)) {
        return;
    }
    if(this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHtml());
}

Pagination.prototype.getPaginationHtml = function() {
    var html = '';
    var pageArray = [];
    var start = this.option.pageNum - this.option.pageRange > 0
        ? this.option.pageNum - this.option.pageRange : 1;
    var end = this.option.pageNum + this.option.pageRange < this.option.pages
        ? this.option.pageNum + this.option.pageRange : this.option.pages;
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    for(var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: i === this.option.pageNum
        })
    }
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });

    html = util.renderHtml(paginationTpl, {
        pageArray: pageArray,
        pageNum: this.option.pageNum,
        pages: this.option.pages
    });
    return html;
}

module.exports = Pagination;