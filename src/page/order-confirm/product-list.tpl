<table class="product-table">
    <tr>
        <th class="cell-img">&nbsp;</th>
        <th class="cell-info">商品描述</th>
        <th class="cell-price">价格</th>
        <th class="cell-count">数量</th>
        <th class="cell-total">小计</th>
    </tr>
    {{#orderList}}
    <tr>
        <td class="cell-img">
            <a href="./detail.html?productId={{productId}}" target="_blank">
                <img src="{{imageHost}}{{productImage}}" alt="{{productName}}" class="p-img">
            </a>
        </td>
        <td class="cell-info">
            <a href="./detail.html?productId={{productId}}" class="link" target="_blank">{{productName}}</a>
        </td>
        <td class="cell-price">￥{{currentUnitPrice}}</td>
        <td class="cell-count">{{quantity}}</td>
        <td class="cell-total">￥{{totalPrice}}</td>
    </tr>
    {{/orderList}}
</table>
<div class="submit-con">
    <span>订单总价</span>
    <span class="submit-total">￥{{payment}}</span>
    <span class="btn order-submit">提交订单</span>
</div>