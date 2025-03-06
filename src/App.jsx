import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import ProductList from './pages/ProductList'
import Cart from './pages/cart';
import { Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Add from './pages/Add';
import UpdateProduct from './pages/update';

function App() {
  
  let listCategoties = {"table": "שולחן ואירוח", "livingRoom": "סלון ואווירה", "accessories": "אקססוריז", "packages": "מארזים"};
  return (
    <>
      <NavBar categoties={listCategoties}/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/table" element={<ProductList category='table'/>}/>
          <Route path="/livingRoom" element={<ProductList category='livingRoom'/>}/>
          <Route path="/accessories" element={<ProductList category='accessories'/>}/>
          <Route path="/packages" element={<ProductList category='packages'/>}/>
          <Route path="/tablecloths" element={<ProductList category='tablecloths'/>}/>
          <Route path="/placement" element={<ProductList category='placement'/>}/>
          <Route path="/fragrance" element={<ProductList category='fragrance'/>}/>
          <Route path="/flower" element={<ProductList category='flower'/>}/>
          <Route path="/home" element={<ProductList category='home'/>}/>
          <Route path="/candlesticks" element={<ProductList category='candlesticks'/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/add' element={<Add/>}/> 
          <Route path='/update' element={<UpdateProduct/>}/>               
      </Routes>
    </>  
  )
}

export default App
