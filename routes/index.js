var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../component/cart');
//初始化购物车
var cart = new Cart();

/* GET home page. */
router.get('/', function (req, res, next) {
    var productChunks = [];
    var chunkSize = 3;
    //查询数据库得到所有产品
    Product.find({}, function (err, products) {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < products.length; i += chunkSize) {
            productChunks.push(products.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

/* add product to cart*/
router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    //数据库中查询产品
    Product.findById(productId, function (err, product) {
        if (err) {
            console.log(err);
            return;
        }
        //增加产品去购物车中
        cart.addProduct(product);
        console.log(cart);
    });
});


module.exports = router;
