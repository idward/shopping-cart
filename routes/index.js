var express = require('express');
var router = express.Router();
var Product = require('../models/product');

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

module.exports = router;
