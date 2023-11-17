import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../dashboard/scenes/cart-context/cart-context';
import Header from '../index/header';
import Footer from '../index/footer';

function Cart() {
  const [shippingFee] = useState(10);
  const { addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('product');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    setProducts(products);

    if(products.length > 0) {
      // Get the sub total
      var totalPrice = 0;
  
      for (const product of products) {
          totalPrice += (product.price * product.count);
      }
      setTotalPrice(totalPrice);
    }
    
  }, []);
  

  const handleIncrement = (id) => {
    addToCart();
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id) {
          // If the product exists, increment the count
          return { ...product, count: (product.count || 0) + 1 };
        }
        return product;
      });
  
      // Update localStorage with the new cart data
      localStorage.setItem('product', JSON.stringify(updatedProducts));
      console.log(updatedProducts);
  
      // Calculate and set total price based on updated cart data
      const totalPrice = updatedProducts.reduce((acc, product) => {
        return acc + product.price * product.count;
      }, 0);
      setTotalPrice(totalPrice);
  
      return updatedProducts; // Return a new array reference to trigger a re-render
    });
  };
  
   
  
  const handleDecrement = (id) => {
    removeFromCart();
    setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) => {
            if (product.id === id) {
                // If the product exists and count is greater than 0, decrement the count
                return { ...product, count: Math.max((product.count || 0) - 1, 0) };
            }
            return product;
        });

        // Update localStorage with the new cart data
        localStorage.setItem('product', JSON.stringify(updatedProducts));
        console.log(updatedProducts);

        // Calculate and set total price based on updated cart data
        const totalPrice = updatedProducts.reduce((acc, product) => {
            return acc + product.price * product.count;
        }, 0);
        setTotalPrice(totalPrice);

        return updatedProducts; // Return a new array reference to trigger a re-render
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
              <span className="breadcrumb-item active">Cart</span>
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
                      <td style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}} className="align-middle">
                        <img src={process.env.PUBLIC_URL + '/img/product-images/' + cartItem.image} alt="" style={{ width: '80px', height: '80px' }} /> &nbsp;&nbsp;{cartItem.name}
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
                      <td className="align-middle">${(cartItem.price * cartItem.count)}</td>
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
                            <h6 className="font-weight-medium">Shipping Fee</h6>
                            <h6 className="font-weight-medium">${shippingFee}</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${totalPrice + shippingFee}</h5>
                        </div>
                        <NavLink to='/checkout'><button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button></NavLink>
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



