import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../index/header';
import Footer from '../index/footer';

function Cart() {
  var count = localStorage.getItem('counter');
  const initialValue = count ? parseInt(count) : 0;
  const [counter, setCounter] = useState(initialValue);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    localStorage.setItem('counter', counter.toString());
    var storedProductId = localStorage.getItem('productId');
    var jsonData = storedProductId ? JSON.parse(storedProductId) : [];
    var productCounts = {};
    console.log('Error', jsonData)

    if(jsonData.length > 0) {
      // Iterate through jsonData to count occurrences of each product
      jsonData.forEach(product => {
        const key = product.id; // Use a unique identifier, e.g., product ID
        if (productCounts[key]) {
            // This product has been encountered before
            productCounts[key].count++;
        } else {
            // This is a new product
            productCounts[key] = {
            product: product,
            count: 1,
            };
        }
      });
    
        // Separate unique and duplicate products
        const uniqueProducts = [];
        const duplicateProducts = [];
    
        for (const key in productCounts) {
            if (productCounts[key].count === 1) {
                // Unique product
                uniqueProducts.push({...productCounts[key].product, count: 1});
            } else {
                // Duplicate product
                duplicateProducts.push({
                ...productCounts[key].product, // Copy the product details
                count: productCounts[key].count, // Increase the count
                });
            }
        }
    
        // Now, you have uniqueProducts containing unique products and duplicateProducts
        // containing one entry for each duplicate product with an increased count.
    
        // If you want to update the state with the unique and duplicate products separately, you can do so:
        setProducts([...uniqueProducts, ...duplicateProducts]);
        console.log(products);
    
    
    
    
        // Get the sub total
        var totalPrice = 0;
    
        for (const product of jsonData) {
            totalPrice += product.price;
        }
    
        setTotalPrice(totalPrice);
    }
    
  }, [counter]);

  

  const handleIncrement = (cartItemId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((cartItem) => {
        if (cartItem.id === cartItemId) {
          // Increment the count for the matching cartItem
          return { ...cartItem, count: cartItem.count + 1 };
        }
        return cartItem;
      });
  
      // Update the localStorage with the new cart data
      localStorage.setItem('productId', JSON.stringify(updatedProducts));
  
      return updatedProducts;
    });
  };  
  
  const handleDecrement = (cartItemId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((cartItem) => {
        if (cartItem.id === cartItemId && cartItem.count > 1) {
          // Decrement the count for the matching cartItem, but ensure it's not less than 1
          return { ...cartItem, count: cartItem.count - 1 };
        }
        return cartItem;
      });
    });
  };
  

  return (
    <div>
      {/* Header Starts */}
      <Header/>
      {/* Header Ends */}

      {/* Breadcrumb Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <NavLink to="/" className="breadcrumb-item text-dark">Home</NavLink>
              <span className="breadcrumb-item active">Contact</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Cart Starts */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th style={{display: 'flex', justifyContent: 'flex-start'}}>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {products.map(cartItem => {
                  return (
                    <tr key={cartItem.id}>
                      <td style={{display: 'flex', justifyContent: 'flex-start'}} className="align-middle">
                        <img src={process.env.PUBLIC_URL + '/img/product-images/' + cartItem.image} alt="" style={{ width: '50px' }} /> &nbsp;&nbsp;{cartItem.name}
                      </td>
                      <td className="align-middle">${cartItem.price}</td>
                      <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus" onClick={() => {handleDecrement(cartItem.id)}}>
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={cartItem.count}
                            readOnly
                          />
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus" onClick={() => {handleIncrement(cartItem.id)}}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">${(cartItem.price) * (cartItem.count)}</td>
                      <td className="align-middle">
                        <button className="btn btn-sm btn-danger"><i className="fa fa-times"></i></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="col-lg-4">
                <form className="mb-30" action="">
                    <div className="input-group">
                        <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                        <div className="input-group-append">
                            <button className="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>${totalPrice}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">$10</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${totalPrice + 10}</h5>
                        </div>
                        <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      {/* Cart Ends */}
      {/* Footer Starts  */}
      <Footer/>
        {/* Footer Ends */}


        {/* <!-- Back to Top --> */}
        <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>   
    </div>
  );
}

export default Cart;



