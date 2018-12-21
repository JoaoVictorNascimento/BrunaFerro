var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    category: {type:String, unique: true},
    measure: String,
    description: String,
    image: Blob
}, { versionKey: false })