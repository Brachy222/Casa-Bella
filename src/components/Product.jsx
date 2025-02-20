import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from 'react';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    const handleAddToCart = () => {
        dispatch(addToCart({ _id: product._id, qty: Number(count) ,productName:product.productName})); 
        console.log("נוסף לסל:", { _id: product._id, qty: Number(count) });
        alert("מוצר נוסף בהצלחה!") 
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
