import { useState, useEffect } from 'react'
import axios from 'axios';

import Product from "../components/Product";

const ProductList = (props) => {
    const [api, setApi] = useState(props.api || 'https://project-in-node.onrender.com/api/products');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
  
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("api: " + api);
                const response = await axios.get(api);
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
        {products.length>0?<ul>
        {console.log("products: " + products)}
            {props.products.map((product) => {
            return <li key={product._id}>
            <Product product={product} />
            </li>
        })}
        </ul>: <p>loading...</p>}
        </>
     );
}
 
export default ProductList;