import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

const SpecificCategories = () => {
  const [products, setProducts] = useState([]);
  let { categoryName } = useParams();
  console.log(categoryName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getSingleCategory/${categoryName}`);
        const productArray = response.data.details
        setProducts(productArray);
        console.log(productArray);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header/>
      
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products{categoryName}</span>
        </h2>
        <div className="row px-xl-5">
            {products.map(product => (
              <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product._id}>
                <div className="product-item bg-light mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={process.env.PUBLIC_URL + '/img/product-images/' + product.image} // Assuming categoryImage is the image URL
                      alt={product.image}
                    />
                    <div className="product-action">
                      <a className="btn btn-outline-dark btn-square" href="">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <i className="far fa-heart"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <i className="fa fa-sync-alt"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <i className="fa fa-search"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a
                      className="h6 text-decoration-none text-truncate"
                      href=""
                    >
                      {product.productName} {/* Assuming category is the product name */}
                    </a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${product.price}</h5> {/* Assuming price is available */}
                      <h6 className="text-muted ml-2">
                        <del>${product.quantity}</del> {/* Assuming oldPrice is available */}
                      </h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                      {[1, 2, 3, 4, 5].map(starIndex => (
                        <small
                          key={starIndex}
                          className="fa fa-star text-primary mr-1"
                        ></small>
                      ))}
                      <small>({product.reviews})</small> {/* Assuming reviews count is available */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default SpecificCategories;
