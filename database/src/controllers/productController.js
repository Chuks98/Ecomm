var mongoose = require('mongoose');
const path = require('path');
let ProductModel = require('../models/productModel');
var multer = require('multer');


// Create a product category but check if it already exists first
const newCategory = async (req, res) => {
    var categoryName = req.body.categoryName;
    categoryImageName = Date.now() + path.extname(req.body.imageName);
    const exists = await ProductModel.exists({ categoryName: categoryName });
    if (exists) {
        return res.send('301');
    } else {
        const new_category = ProductModel({
            categoryName: categoryName,
            categoryImage: categoryImageName
        });
        await new_category.save().then(resp => {
            return res.send('200');
        }).catch(e => {
            return res.send('401');
        });
    }
};


// Updating a category
const updateCategory = async (req, res) => {
    try {
        console.log(req.body);
        var categoryId = req.body.categoryId;
        var categoryName = req.body.categoryName;
        categoryImageName = req.body.categoryImage ? Date.now() + path.extname(req.body.categoryImage) : '';

        const query = { _id: categoryId }; // Assuming the category is identified by _id

        const updateFields = {
            categoryName: categoryName,
            categoryImage: categoryImageName,
        };

        const updatedCategory = await ProductModel.findOneAndUpdate(query, updateFields, { new: true });

        if (updatedCategory) {
            console.log('Category successfully updated.');
            res.send('200');
        } else {
            console.log("Category not found or not updated.");
        }
    } catch (error) {
        console.error("Error updating category:", error);
        res.sendStatus(500);
    }
};


// Uploading Category Image
const categoryImagePath = 'C:/Users/DELL - PC/Desktop/My Templates/E-commerce Templates/New App/Ecommerce Project/ecommerce/public/img/category-images';
// Using The MULTER Engine For The Image Upload
var store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, categoryImagePath);
    },
    filename: function(req, file, cb) {
        cb(null, categoryImageName);
    }
}); 
// This is where the actual uploading happens
const categoryImageUpload = multer({storage: store});
const categoryImage = (req, res) => {
    categoryImageUpload.single('img')(req, res, () => {
        console.log(req.file);
    });
};


// Get the category list
const getCategories = async (req, res) => {
    ProductModel.find().then(resp => {
        res.send(resp);
    }).catch(e => {
        console.log("Couldn't get categories from the database.");
    });
};

// Get a single category by categoryName
const getSingleCategory = async (req, res) => {
    var categoryName = req.params.categoryName;
    console.log(categoryName);
    ProductModel.findOne({categoryName}).then(resp => {
        console.log(resp)
        res.send(resp);
    }).catch(e => {
        console.log("Couldn't get single category from the database.");
    });
};

// Get a single category by _id to update
const getUpdateSingleCategory = async (req, res) => {
    var categoryId = req.params.id;
    console.log(categoryId);
    ProductModel.findById({_id: categoryId}).then(resp => {
        console.log(resp);
        res.send(resp);
    }).catch(e => {
        console.log("Couldn't get single category from the database.");
    });
};



// Deleting a single category
const deleteSingleCategory = async (req, res) => {
    var categoryId = req.params.id;
    console.log(categoryId);
    ProductModel.findByIdAndDelete({_id: categoryId}).then(resp => {
        console.log('Category successfully deleted.');
        res.send('200');
    }).catch(e => {
        console.error('Category not found or not deleted.', e);
        res.send('400');
    });
};



const newProduct = async (req, res) => {
    const categoryName = req.body.categoryName;
    const productName = req.body.productName;
    const price = req.body.price;
    productImageName = Date.now() + path.extname(req.body.imageName);
    const quantity = req.body.quantity;
    const description = req.body.description;

    await ProductModel.findOne({ categoryName: categoryName }).then(async (productModel) => {
        if (!productModel) {
            return res.send('301');
        }
    
        const updateProducts = {
            categoryName: categoryName,
            productName: productName,   
            price: price,
            productImage: productImageName,
            quantity: quantity,
            description: description
        };

        productModel.details.push(updateProducts);
        productModel.save().then(resp => {
            return res.send('200');
        }).catch(e => {
            return res.send('401');
        });
    });
};


// update a product
const updateProduct = async (req, res) => {
    var productId = req.body.productId;
    var productName = req.body.productName;
    var price = req.body.price;
    productImageName = req.body.imageName ? Date.now() + path.extname(req.body.imageName) : '';
    var quantity = req.body.quantity;
    var description = req.body.description;

    const updateFields = {
        $set: {
            'details.$.productName': productName,
            'details.$.price': price,
            'details.$.quantity': quantity,
            'details.$.description': description
        }
    };

    if (req.body.imageName) {
        updateFields.$set['details.$.productImage'] = productImageName;
    }

    await ProductModel.findOneAndUpdate(
        { 'details._id': new mongoose.Types.ObjectId(productId) },
        updateFields,
        { new: true } // Return the updated document
    ).then(rsp => {
        console.log('Product successfully updated.');
        res.send('200');
    }).catch(e => {
        console.error('Product not successfully updated.', e);
    })
};


// Uploading Product Image
const productImagePath = 'C:/Users/DELL - PC/Desktop/My Templates/E-commerce Templates/New App/Ecommerce Project/ecommerce/public/img/product-images';
// Using The MULTER Engine For The Image Upload
var store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, productImagePath);
    },
    filename: function(req, file, cb) {
        cb(null, productImageName);
    }
}); 
// This is where the actual uploading happens
const productImageUpload = multer({storage: store});
const productImage = (req, res) => {
    productImageUpload.single('img')(req, res, () => {
        console.log(req.file);
    });
};


// Getting The Products
const getProducts = async (req, res) => {
    try {
        const categories = await ProductModel.find();
        const productList = [];

        categories.forEach(category => {
            const details = category.details;

            details.forEach(product => {
                productList.push(product);
            });
        });

        res.json(productList); // Send the product list as JSON response. res.send will also work
    } catch (e) {
        console.log("Couldn't get products from the database.", e);
        res.status(500).send("Internal Server Error"); // Handle the error and send an appropriate response
    }
};


// Get a single product
const getSingleProduct = async (req, res) => {
    const productId = req.params.id;
    await ProductModel.findOne({ 'details._id': new mongoose.Types.ObjectId(productId)}, {'details.$': 1}).then(resp => {
        var productDetails = resp.details;
        res.send(productDetails);
    }).catch(e => {
        console.error("Couldn't get the single product from the database.", e);
        res.send('Internal Server Error');
    });
};


// Deleting a product
const deleteSingleProduct = async (req, res) => {
    let productId = req.params.id;
    await ProductModel.findOneAndUpdate({}, { $pull: { details: { _id: productId } } }, { new: true }).then(resp => {
        console.log('Product successfully deleted.');
        res.send('200');
    }).catch(e => {
        console.error('Product not found or not deleted.', e);
        res.send('400');
    });
};




// I must export this before my Router sees this code and observe the curly parenthesis here.
module.exports = {getCategories, newCategory, getSingleCategory, getUpdateSingleCategory, categoryImage, updateCategory, deleteSingleCategory, newProduct, productImage, getProducts, getSingleProduct, updateProduct, deleteSingleProduct};