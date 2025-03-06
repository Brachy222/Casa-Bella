import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);

    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addToCart({ _id: product._id, qty: Number(count) ,productName:product.productName,image:product.image,price:product.price})); 
        console.log("נוסף לסל:", { _id: product._id, qty: Number(count) });
        navigate("/smallCart") 
    };

    return ( 
        <div className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.productName}</h3>
            <p>{product.price + '.00 ש"ח'}</p>
            <input 
                className="cnt-products"
                type="number" 
                value={count} 
                min="1"
                onChange={(e) => setCount(e.target.value)} 
            />
            <button onClick={handleAddToCart}>הוסף לסל</button>
        </div>
    );
}

export default Product;
