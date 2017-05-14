//购物车模型
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    var productItem;

    this.addProduct = function (product) {
        var productItemId = product._id;

        //如果购物车中产品不存在
        if (!this.items[productItemId]) {
            productItem = {item: product, itemQuantity: 0, itemPrice: 0};
            this.items[productItemId] = productItem;
        }
        //如果购物车中产品已存在
        this.items[productItemId].itemQuantity++;
        this.items[productItemId].itemPrice = this.items[productItemId].itemQuantity *
            this.items[productItemId].item.price;
        this.totalQuantity = this.totalQuantity + 1;
        this.totalPrice = this.totalPrice + this.items[productItemId].item.price;
        //返回Cart对象
        return this;
    };
}