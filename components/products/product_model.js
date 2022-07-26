const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category' }, // khóa ngoại
});

module.exports = mongoose.model('product', productSchema);