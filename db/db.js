var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/shoppingCart');

db.on('open', function () {
    console.log('数据库已经连接成功...');
});

db.on('error', function (err) {
    console.log('数据库连接失败...');
    console.log(err.stack);
});

module.exports = db;