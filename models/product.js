var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

var Product = mongoose.model('product', productSchema);

module.exports = Product;