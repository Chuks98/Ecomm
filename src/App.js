import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/index/index';
import Shop from './components/shop/shop';
import Details from './components/details/details';
import Contact from './components/contact/contact';
import Cart from './components/cart/cart';
import Login from './components/user_authentication/login';
import Register from './components/user_authentication/register';
import Checkout from './components/checkout/checkout';
import DashboardLayout from './dashboard_routing';
import SpecificCategories from './components/index/specific_categories';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories/:categoryName" element={<SpecificCategories />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/details" element={<Details />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
