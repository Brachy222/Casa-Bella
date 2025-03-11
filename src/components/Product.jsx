import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {httpDeleteProduct} from "../api/productService"


const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addToCart({ _id: product._id, qty: Number(count) ,productName:product.productName,image:product.image,price:product.price})); 
        console.log("נוסף לסל:", { _id: product._id, qty: Number(count) });
        navigate("/smallCart") 
    };

    const deleteProduct = (id) => {
        httpDeleteProduct(id).then(res =>{
        alert("מוצר נמחק בהצלחה")
        } ).catch(err => {
            console.log(err);
            alert("שגיאה במחיקה")
        })
    }

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
            {user?.user.role === "admin" && (
            <>
                    <button onClick={() => deleteProduct(product._id)}>מחק מוצר</button>
            </>
        )}      
        </div>
    );
}

export default Product;
