import { useSelector, useDispatch } from "react-redux";
import { updateQuantity,deleteFromCart} from "../features/cartSlice";
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../Styles/cart.css" 

const Cart = () => {
    const cart = useSelector(state => state.cart.arr);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sum,setSum] = useState(0);
    const [cnt,setCnt] = useState(0);

    const changeQty = (id, newQty) => {
        dispatch(updateQuantity({ _id: id, qty: Number(newQty) }));
    };

    const delItem = (id) => {
        dispatch(deleteFromCart({ _id: id}));
    };

    const goToOrderPage = () => {
        navigate("/order"); 
    };

    useEffect(() => {
        let totalSum = 0;
        let totalCnt = 0;
        cart.forEach(item => {
            totalCnt += item.qty;
            totalSum += item.qty * item.price;
        });
        setCnt(totalCnt);
        setSum(totalSum);
        console.log("the cart",cart);
        localStorage.setItem("cart",JSON.stringify(cart))
    }, [cart]);
    
    return (
        <div className="cart-div">
            <h3>עגלת קניות</h3>
            <ul>
                {cart.map(item => (
                    <li key={item._id} className="li-cart">
                        <img src={item.image} alt="img item" className="img-cart"/>
                        <div className="div-in-cart">
                        <p>{item.productName} </p>
                        <p>מחיר: {item.price}</p>
                        <p> כמות: {item.qty}</p>
                        <p>סה"כ מחיר: {item.price*item.qty}</p>
                        <input 
                            className="cnt-products"
                            type="number" 
                            value={item.qty} 
                            min="1"
                            onChange={(e) => changeQty(item._id, e.target.value)}
                        />
                        <button onClick={() => delItem(item._id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <p>סה"כ מוצרים: {cnt}</p>
                <p>סה"כ לתשלום: {sum}</p>
                <button onClick={goToOrderPage}>הזמנה</button>
            </div>
        </div>
    );
};

export default Cart;
