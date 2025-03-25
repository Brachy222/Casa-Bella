import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../features/cartSlice";

const Counter = ({ item }) => {
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(updateQuantity({ _id: item._id, qty: item.qty + 1 }));
    };

    const decrement = () => {
        if (item.qty > 1) {
            dispatch(updateQuantity({ _id: item._id, qty: item.qty - 1 }));
        } else {
            dispatch(deleteFromCart({ _id: item._id })); // אם הכמות היא 1 ולוחצים "-", נמחק את המוצר
        }
    };

    return (
        <div style={styles.container}>
            <input type="button" style={styles.button} onClick={decrement} value={"-"} />
            <div style={styles.number}>{item.qty}</div>
            <input type="button" style={styles.button} onClick={increment} value={"+"} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        marginTop: '6px',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid black',
        padding: '5px 10px',
        width: '100px',
    },
    button: {
        width: '20px',
        height: '20px',
        fontSize: '15px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: '15px',
        textAlign: 'center',
        flex: 1,
    }
};

export default Counter;
