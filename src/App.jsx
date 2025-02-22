import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import ProductList from './pages/ProductList'
import Cart from './pages/cart';
import { Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  
  let listCategoties = ["table", "livingRoom", "accessories", "packages"];
  return (
    <>
      <NavBar categoties={listCategoties}/>
      <Routes>
          <Route path="/" element={<ProductList api='https://project-in-node.onrender.com/api/products'/>}/>
          <Route path="/table" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/שולחן ואירוח'/>}/>
          <Route path="/livingRoom" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/סלון ואווירה'/>}/>
          <Route path="/accessories" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/אקססוריז'/>}/>
          <Route path="/packages" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/מארזים'/>}/>
          <Route path="/tablecloths" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/מפות'/>}/>
          <Route path="/placement" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/פלייסמנט'/>}/>
          <Route path="/fragrance" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/מפיץ ריח'/>}/>
          <Route path="/flower" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/פרחים מיובשים'/>}/>
          <Route path="/home" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/אקססוריז לבית'/>}/>
          <Route path="/candlesticks" element={<ProductList api='https://project-in-node.onrender.com/api/products/category/פמוטים'/>}/>
          <Route path="/login" element={<p>login</p>}/>
          <Route path="/cart" element={<Cart/>}/>        
      </Routes>
    </>  
  )
}

export default App
