import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Flutterwave from 'flutterwave';
import Header from '../index/header';
import Footer from '../index/footer';

function Chekout() {
    const [shippingFee] = useState(10);
    const products = localStorage.getItem('product');
    const cartProducts = products ? JSON.parse(products) : [];

    const [product] = useState(cartProducts);

    const calcTotalPrice = product.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.count;
    }, 0);

    const [totalPrice] = useState(calcTotalPrice);

    const handleFlutterwave = () => {
        const flutterwaveConfig = {
            public_key: 'FLWPUBK_TEST-5e33eb6807f77c35301e4b175b23f9d9-X',
            tx_ref: Date.now(),
            amount: totalPrice + shippingFee,
            currency: 'USD',
            payment_options: 'card',
            redirect_url: '/success',
            meta: {
              consumer_id: 23,
              consumer_mac: '92a3-912ba-1192a',
            },
            customizations: {
              title: 'Your Store',
              description: 'Payment for items in your cart',
              logo: 'https://your-store-logo.png',
            },
        };  
    };


    return(
        <div>
             {/* Header Starts */}
             <Header/>
            {/* Header Ends */}

            {/* <!-- Breadcrumb Start --> */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <NavLink to="/" className="breadcrumb-item text-dark">Home</NavLink>
                            <span className="breadcrumb-item active">Checkout</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}



            {/* Checkout Starts */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input className="form-control" type="text" placeholder="John" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Last Name</label>
                                    <input className="form-control" type="text" placeholder="Doe" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input className="form-control" type="text" placeholder="example@email.com" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input className="form-control" type="text" placeholder="+123 456 789" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address Line 1</label>
                                    <input className="form-control" type="text" placeholder="123 Street" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address Line 2</label>
                                    <input className="form-control" type="text" placeholder="123 Street" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Country</label>
                                    <select className="custom-select">
                                        <option defaultValue>United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>City</label>
                                    <input className="form-control" type="text" placeholder="New York" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>State</label>
                                    <input className="form-control" type="text" placeholder="New York" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>ZIP Code</label>
                                    <input className="form-control" type="text" placeholder="123" />
                                </div>
                                {/* <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="newaccount" />
                                        <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="shipto" data-toggle="collapse" data-target="#shipping-address" />
                                        <label className="custom-control-label" htmlFor="shipto">Ship to different address</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="collapse mb-5" id="shipping-address">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Shipping Address</span></h5>
                            <div className="bg-light p-30">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>First Name</label>
                                        <input className="form-control" type="text" placeholder="John" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Last Name</label>
                                        <input className="form-control" type="text" placeholder="Doe" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input className="form-control" type="text" placeholder="example@email.com" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Mobile No</label>
                                        <input className="form-control" type="text" placeholder="+123 456 789" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address Line 1</label>
                                        <input className="form-control" type="text" placeholder="123 Street" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address Line 2</label>
                                        <input className="form-control" type="text" placeholder="123 Street" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Country</label>
                                        <select className="custom-select">
                                            <option defaultValue>United States</option>
                                            <option>Afghanistan</option>
                                            <option>Albania</option>
                                            <option>Algeria</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>City</label>
                                        <input className="form-control" type="text" placeholder="New York" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>State</label>
                                        <input className="form-control" type="text" placeholder="New York" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>ZIP Code</label>
                                        <input className="form-control" type="text" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom">
                                <h6 className="mb-3">Products</h6>
                                {product.map(cartItem => (
                                    <div className="d-flex justify-content-between">
                                        <p>{cartItem.name} ({cartItem.count})</p>
                                        <p>${cartItem.price * cartItem.count}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-bottom pt-3 pb-2">
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
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                            <div className="bg-light p-30">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="paypal" checked/>
                                        <label className="custom-control-label" htmlFor="paypal">Flutterwave</label>
                                    </div>
                                </div>
                                {/* <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                        <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                                        <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                                    </div>
                                </div> */}
                                <button className="btn btn-block btn-primary font-weight-bold py-3" onClick={() => {handleFlutterwave()}}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout Ends */}


            {/* Footer Starts  */}
            <Footer/>
            {/* Footer Ends */}


            {/* <!-- Back to Top --> */}
            <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
        </div>
    );
}

export default Chekout;