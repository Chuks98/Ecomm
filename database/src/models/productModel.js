const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    productImage: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    description: String,
    rating: {
        type: Number,
        default: 0
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

const productSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
    },
    details: [productDetailsSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;