import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import ProductList from './ProductList'

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get('https://project-in-node.onrender.com/api/products');
              setProducts(response.data); 
              console.log(response.data);
              
          } catch (err) {
              setError(err.message);
          }
      };

      fetchProducts();
  }, []);

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <>
    <h2>המוצרים שלנו</h2>
      {products&&<ProductList products={products}/>}
    </>
  )
}

export default App
