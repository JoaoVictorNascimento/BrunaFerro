const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true, require: true },
    name: String,
    phone: String,
    obs: String,
    productList: [
        {
            productId:{ type: String, required: true},
            quantity: Number,
        }
    ],

})

module.exports = mongoose.model('User', UserSchema)
const User = mongoose.model('User', UserSchema)

module.exports.getUsers = function (callback) {
    User.find(callback)
}

module.exports.getUserByEmail = function (email, callback) {
    User.find({email: email}, callback)
}

module.exports.addUser = function (user, callback) {
    User.create(user, callback)
}

module.exports.deleteUser = function (id, callback) {
    User.deleteOne({_id: id}, callback)
}