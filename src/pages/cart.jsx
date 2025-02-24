import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../features/cartSlice"; // עדכני בהתאם למיקום

const Cart = () => {
    const cart = useSelector(state => state.cart.arr);
    const dispatch = useDispatch();

    const changeQty = (id, newQty) => {
        dispatch(updateQuantity({ _id: id, qty: Number(newQty) }));
    };

    return (
        <div className="cart-div">
            <h3>עגלת קניות</h3>
            <ul>
                {cart.map(item => (
                    <li key={item._id}>
                        <p>{item.productName} </p>
                        <p> כמות: {item.qty}</p>
                        <input 
                            className="cnt-products"
                            type="number" 
                            value={item.qty} 
                            min="1"
                            onChange={(e) => changeQty(item._id, e.target.value)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
