//购物车模型
module.exports = function Cart() {
    this.items = {};
    this.items.totalQuantity = 0;
    this.items.totalPrice = 0;
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
        this.items.totalQuantity = this.items.totalQuantity + 1;
        this.items.totalPrice = this.items.totalPrice + this.items[productItemId].item.price;

        return this.items;
    };
}