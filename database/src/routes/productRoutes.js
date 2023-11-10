const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware for authentication or other necessary checks
// router.use(someMiddlewareFunction);

// Route: GET /category
router.post('/newCategory', productController.newCategory);
router.post('/categoryImage', productController.categoryImage);
router.get('/getCategories', productController.getCategories);
router.get('/getSingleCategory/:categoryName', productController.getSingleCategory);
router.get('/getUpdateSingleCategory/:id', productController.getUpdateSingleCategory);
router.patch('/updateCategory', productController.updateCategory);
router.delete('/deleteSingleCategory/:id', productController.deleteSingleCategory);

router.post('/newProduct', productController.newProduct);
router.post('/productImage', productController.productImage);
router.get('/getProducts', productController.getProducts);
router.get('/getSingleProduct/:id', productController.getSingleProduct);
router.patch('/updateProduct/', productController.updateProduct);
router.delete('/deleteSingleProduct/:id', productController.deleteSingleProduct);


// Route: GET /product/products
router.get('/products', (req, res) => {
  // Logic to fetch and display a list of products in the admin section
  res.send('Admin Product List');
});

// Route: GET /product/products/:id
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  // Logic to fetch and display a specific product by its ID in the admin section
  res.send(`Product Details for ID ${productId}`);
});


// Route: POST /product/products
router.post('/products', productController.newProduct);

// Route: PUT /product/products/:id
router.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  // Logic to update a specific product by its ID in the admin section
  res.send(`Product Updated for ID ${productId}`);
});

// Route: DELETE /product/products/:id
router.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  // Logic to delete a specific product by its ID in the admin section
  res.send(`Product Deleted for ID ${productId}`);
});

module.exports = router;
