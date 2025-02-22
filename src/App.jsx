import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import ProductList from './pages/ProductList'
import Cart from './pages/cart';
import { Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  
  let listCategoties = {"table": "שולחן ואירוח", "livingRoom": "סלון ואווירה", "accessories": "אקססוריז", "packages": "מארזים"};
  return (
    <>
      <NavBar categoties={listCategoties}/>
      <Routes>
          <Route path="/" element={<ProductList api='https://project-in-node.onrender.com/api/products'/>}/>
          <Route path="/table" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/table'/>}/>
          <Route path="/livingRoom" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/livingRoom'/>}/>
          <Route path="/accessories" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/accessories'/>}/>
          <Route path="/packages" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/packages'/>}/>
          <Route path="/tablecloths" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/tablecloths'/>}/>
          <Route path="/placement" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/placement'/>}/>
          <Route path="/fragrance" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/fragrance'/>}/>
          <Route path="/flower" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/flower'/>}/>
          <Route path="/home" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/home'/>}/>
          <Route path="/candlesticks" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/candlesticks'/>}/>
          <Route path="/login" element={<p>login</p>}/>
          <Route path="/cart" element={<Cart/>}/>        
      </Routes>
    </>  
  )
}

export default App
