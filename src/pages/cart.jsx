import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector(state => state.cart.arr);

    console.log("תוכן העגלה:", cart); // זה יראה את הנתונים המעודכנים

    return (
        <div>
            <h2>עגלת קניות</h2>
            {cart.map(item => (
                <div key={item._id}>
                    <p>{item.productName} - כמות: {item.qty}</p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
