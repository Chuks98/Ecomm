import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../index/header';
import ItemDetail from './item_detail';
import Footer from '../index/footer';
import RelatedProducts from './related-Products';

function Details() {
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
                            <NavLink to="/details" className="breadcrumb-item text-dark">Shop</NavLink>
                            <span className="breadcrumb-item active">Item Detail</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}



            {/* Item Detail Starts */}
            <ItemDetail/>
            {/* Item Detail Ends */}


            {/* Related Products Start */}
            <RelatedProducts/>
            {/* Related Products End */}


            {/* Footer Starts  */}
            <Footer/>
            {/* Footer Ends */}


            {/* <!-- Back to Top --> */}
            <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
        </div>
    );
}

export default Details;