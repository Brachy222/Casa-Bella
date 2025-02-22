import { useState, useEffect } from 'react'
import axios from 'axios';

import Product from "../components/Product";

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
  
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const newCategory = props.category ? "category/" + props.category : "";
                const url = `https://project-in-node.onrender.com/api/products/${newCategory}`;
                console.log("url: " + url);
                const response = await axios.get(url);
                setProducts(response.data); 
                console.log(response.data);
            } catch (err) {
                setError(err.message);
            }
        };
    
        fetchProducts();
    }, [props.category]);
    if (error) {
        return <div>Error: {error}</div>;
    }
  

    return ( 
        <>
        {products.length>0?<ul>
            {console.log("hellooooo!!!!!!!!!!!")}
            {console.log("products: " + products)}
            {products.map((product) => {
            return <li key={product._id}>
            <Product product={product} />
            </li>
        })}
        </ul>: <p>loading...</p>}
        </>
     );
}
 
export default ProductList;