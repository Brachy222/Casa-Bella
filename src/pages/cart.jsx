import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector(state => state.cart.arr);

    console.log("תוכן העגלה:", cart); // זה יראה את הנתונים המעודכנים

    return (
        <div className="cart-div">
            <h3>עגלת קניות</h3>
            <ul>
            {cart.map(item => (
                <li key={item._id}>
                    <p>{item.productName} </p>
                    <p> כמות: {item.qty}</p>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Cart;
