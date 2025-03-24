import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {httpDeleteProduct,httpUpdateProduct} from "../api/productService"
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';




const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const theme = useTheme();


    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, qty: Number(count) })) 
        // dispatch(addToCart({ _id: product._id, qty: Number(count) ,productName:product.productName,image:product.image,price:product.price})); 
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

    const updateProduct = (id) => {
        navigate(`/update/${id}`); 
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
            <IconButton color="theme.palette.brown.main" aria-label="add to shopping cart">
                <AddShoppingCartIcon onClick={handleAddToCart} />
            </IconButton>
            {/* <button onClick={handleAddToCart}>הוסף לסל</button> */}
            {user&&user?.role === "admin" && (
            <>
                    <button onClick={() => deleteProduct(product._id)}>מחק</button>
                    <button onClick={() => updateProduct(product._id)}>עדכן</button>
            </>
        )}      
        </div>
    );
}

export default Product;
