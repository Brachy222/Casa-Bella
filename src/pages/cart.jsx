import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "../Styles/cart.css";

const Cart = () => {
    const cart = useSelector(state => state.cart.arr);
    const user = JSON.parse(localStorage.getItem("user"))
    const totalSum = useSelector(state => state.cart.sum);
    const totalCount = useSelector(state => state.cart.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeQty = (id, newQty) => {
        dispatch(updateQuantity({ _id: id, qty: Number(newQty) }));
    };

    const delItem = (id) => {
        dispatch(deleteFromCart({ _id: id }));
    };

    const goToOrderPage = () => {
        if (user != null) {
           navigate("/order");
        }
        else {
             alert("משתמש לא רשום , נא בצע כניסה")
             navigate("/login");
        }
    };

    return (
        <div className="cart-div">
            <h2 id="h2-div">עגלת קניות</h2>
            <ul>
                {cart.map(item => (
                    <li key={item._id} className="li-cart">
                        <img src={item.image} alt="img item" className="img-cart"/>
                        <div className="div-in-cart">
                            <p>{item.productName} </p>
                            <p>מחיר: {item.price} </p>
                            <p> כמות: {item.qty}</p>
                            <p>סה"כ מחיר: {item.price * item.qty} ₪</p>
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
            <div className="cart-summary-div">
                <p>סה"כ מוצרים: {totalCount}</p>
                <p className="sum">סה"כ לתשלום: {totalSum} ₪</p>
                <p>
                    <input type="checkbox" id="terms" name="terms" />
                    <label htmlFor="terms">אני מסכים/ה ל תנאי השימוש.</label>
                </p>
                <button className="order-button" onClick={goToOrderPage}>לתשלום והזמנה</button>
            </div>
        </div>
    );
};

export default Cart;
