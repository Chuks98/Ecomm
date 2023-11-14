import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../dashboard/scenes/cart-context/cart-context';
import { LocalSeeRounded } from '@mui/icons-material';

const Products1 = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [thisCart, setThisCart] = useState({}); // Use an object to track counts for each product

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // When the component mounts, retrieve saved product array from localStorage
    var storedProduct = localStorage.getItem('product');
    var products = storedProduct ? JSON.parse(storedProduct) : [];
  
    // Extract counts for each product
    const counts = products.reduce((countObj, item) => {
      countObj[item.id] = item.count;
      return countObj;
    }, {});
  
    // Update the state with the counts
    setThisCart(counts);
  }, []);
  
  
  
  const handleAddToCart = (id, name, image, price) => {
    // Retrieve existing items from localStorage
    const storedProducts = localStorage.getItem('product');
    const product = storedProducts ? JSON.parse(storedProducts) : [];
  
    // Check if the product with the given id already exists in the cart
    const existingProductIndex = product.findIndex((item) => item.id === id);
  
    if (existingProductIndex !== -1) {
      // If the product exists, increment the count
      product[existingProductIndex].count = (product[existingProductIndex].count || 0) + 1;
    } else {
      // If the product doesn't exist, add it to the cart with count 1
      const newItem = { id, name, image, price, count: 1 };
      product.push(newItem);
    }
  
    // Update localStorage with the new cart data
    localStorage.setItem('product', JSON.stringify(product));
  
    // Update localStorage with the new counts and subtotals
    const productCounts = product.reduce((countObj, item) => {
      countObj[item.id] = item.count;
      return countObj;
    }, {});
  
    // Update the count for the specific product
    setThisCart(productCounts);

    addToCart();
  
    console.log(product);
    alert('Product added to cart');
  };
  
  
  

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>
      <div className="row px-xl-5">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product._id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img
                  className="img-fluid w-100"
                  src={process.env.PUBLIC_URL + '/img/product-images/' + product.productImage}
                  alt=""
                />
                <div className="product-action">
                  <a className="btn btn-outline-dark btn-square" onClick={() => handleAddToCart(product._id, product.productName, product.productImage, product.price)}>
                    <i className="fa fa-shopping-cart"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>
                      {thisCart[product._id] || 0}
                    </span>
                  </a>
                  <a className="btn btn-outline-dark btn-square" href="">
                    <i className="far fa-heart"></i>
                  </a>
                </div>
              </div>
              <div className="text-center py-4">
                <a className="h6 text-decoration-none text-truncate" href="">
                  {product.productName}
                </a>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>${product.price}</h5>
                  <h6 className="text-muted ml-2">
                    <del>${product.quantity}</del>
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <small
                      key={starIndex}
                      className="fa fa-star text-primary mr-1"
                    ></small>
                  ))}
                  <small>({product.reviews})</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products1;
