import React from 'react';

const Product = ({ imgSrc, productName, price, oldPrice, rating }) => (
  <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div className="product-item bg-light mb-4">
      <div className="product-img position-relative overflow-hidden">
        <img className="img-fluid w-100" src={imgSrc} alt=""/>
        <div className="product-action">
          <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
          <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
        </div>
      </div>
      <div className="text-center py-4">
        <a className="h6 text-decoration-none text-truncate" href="">{productName}</a>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <h5>{price}</h5><h6 className="text-muted ml-2"><del>{oldPrice}</del></h6>
        </div>
        <div className="d-flex align-items-center justify-content-center mb-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <small
              key={index}
              className={`fa ${index < rating ? 'fa-star text-primary' : 'far fa-star text-primary'} mr-1`}
            ></small>
          ))}
          <small>(99)</small>
        </div>
      </div>
    </div>
  </div>
);

const Products2 = () => (
  <div className="container-fluid pt-5 pb-3">
    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Recent Products</span></h2>
    <div className="row px-xl-5">
      <Product
        imgSrc="img/product-1.jpg"
        productName="Product Name 1"
        price="$123.00"
        oldPrice="$123.00"
        rating={5}
      />
      <Product
        imgSrc="img/product-2.jpg"
        productName="Product Name 2"
        price="$123.00"
        oldPrice="$123.00"
        rating={4}
      />
      <Product
        imgSrc="img/product-3.jpg"
        productName="Product Name 3"
        price="$123.00"
        oldPrice="$123.00"
        rating={4}
      />
      <Product
        imgSrc="img/product-4.jpg"
        productName="Product Name 4"
        price="$123.00"
        oldPrice="$123.00"
        rating={3.5}
      />
      {/* Repeat for other products */}
    </div>
  </div>
);

export default Products2;
