import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {categories.map(category => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category}>
            <a className="text-decoration-none" href="">
              <Link to={'/categories/' + category.categoryName}>
                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                  <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
                    <img className="img-fluid" style={{ width: '100%', height: '100%' }} src={process.env.PUBLIC_URL   + '/img/category-images/' + category.categoryImage} alt={`Category ${category.categoryImage}`} />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{category.categoryName}</h6>
                    <small className="text-body">{category.details.length} Item(s)</small>
                  </div>
                </div>
              </Link>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
