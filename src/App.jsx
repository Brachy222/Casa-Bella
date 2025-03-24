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
import UpdateProduct from './pages/Update';
import SmallCart from './pages/SmallCart';
import Order from './pages/Order';
import Logout from "./pages/Logout"
import { createTheme, ThemeProvider,  useTheme  } from '@mui/material/styles';


const theme = createTheme({
  palette: {
      primary: {
          main: '#1976d2', // צבע ראשי
      },
      secondary: {
          main: '#dc004e', // צבע משני
      },
      brown: {
          main: '#8B4513', // צבע חום
      },
  },
});

function App() {
  const theme = useTheme();
  console.log(JSON.stringify(theme.palette, null, 2));
  let listCategoties = {"table": "שולחן ואירוח", "livingRoom": "סלון ואווירה", "accessories": "אקססוריז", "packages": "מארזים"};
  return (
    <> 
    <ThemeProvider theme={theme}>
        <NavBar categoties={listCategoties} theme = {theme}/>
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
            <Route path='/update/:id' element={<UpdateProduct/>}/>
            <Route path='/smallCart' element={<SmallCart/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='logout' element={<Logout/>}/>               
                
        </Routes>
      </ThemeProvider>
    </>  
  )
}

export default App
