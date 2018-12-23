var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type:String, require: true},
    measure: String,
    price: Number,
    description: String,
    productImage: {type: String, required: true}
}, { versionKey: false })

module.exports = mongoose.model('Product', ProductSchema)
const Product = mongoose.model('Product', ProductSchema)

module.exports.getProducts = function (callback) {
    Product.find(callback)
}

module.exports.getProductById = function (id, callback) {
    Product.findOne({_id: id}, callback)
}

module.exports.addProduct = function (product, callback) {
    Product.create(product, callback)
}

module.exports.deleteProduct = function (id, callback) {
    Product.deleteOne({_id: id}, callback)
}

module.exports.updateProduct = function(updateProduct, callback) {
    Product.getProductById(updateProduct._id, (err, product) => {
        if(product){
            product.category = (updateProduct.category && updateProduct.category != product.category) ? updateProduct.category : product.category
            product.measure = (updateProduct.measure && updateProduct.measure != product.measure) ? updateProduct.measure : product.measure
            product.ṕrice = (updateProduct.price && updateProduct.price != product.price) ? updateProduct.price : product.price
            product.description = (updateProduct.description && updateProduct.description != product.description) ? updateProduct.description : product.description
            product.productImage = (updateProduct.productImage && updateProduct.productImage != product.productImage) ? updateProduct.productImage : product.productImage
            product.save(callback)
        } else {
            callback(true, null)
        }
    })
}

module.exports.getProductByCategory = function (category, callback) {
    Product.find({ category: category }, callback)
}