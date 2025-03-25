import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Counter from "../components/counter";

import "../Styles/cart.css";

import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

// const CounterButton = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);

//   return (
//     <Box display="flex" alignItems="center">
//       <Button
//         onClick={decrement}
//         variant="contained"
//         sx={{
//           backgroundColor: 'brown',  // צבע הרקע חום
//           }}
//       >
//         -
//       </Button>
//       <Typography variant="h6" sx={{ mx: 2 }}>{count}</Typography>
//       <Button
//         onClick={increment}
//         variant="contained"
//         sx={{
//           backgroundColor: 'brown',  // צבע הרקע חום
//                           // ביטול הריפוד המיותר
//         }}
//       >
//         +
//       </Button>
//     </Box>
//   );
// }

// const Counter = () => {
//     const [count, setCount] = useState(0);
  
//     const increment = () => setCount(count + 1);
//     const decrement = () => {
//       if (count > 0) setCount(count - 1);  // מוודא שהמספר לא ירד מתחת ל-0
//     };
  
//     return (
//       <div style={styles.container}>
//         <input type="button" style={styles.button} onClick={decrement} value={"-"} />
//         <div style={styles.number}>{count}</div>
//         <input type="button" style={styles.button} onClick={increment} value={"+"} />
//       </div>
//     );
//   };
  
//   const styles = {
//     container: {
//       display: 'flex',
//       marginTop: '6px',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       border: '1px solid black',
//       padding: '5px 10px',
//       width: '100px', // ניתן לשנות בהתאם לרוחב הרצוי
//     },
//     button: {
//       width: '20px',
//       height: '20px',
//       fontSize: '15px',
//       cursor: 'pointer',
//       backgroundColor: 'transparent',
//       border: 'none',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     number: {
//       fontSize: '15px',
//       textAlign: 'center',
//       flex: 1, // דואג שהמספר יישאר במרכז
//     }
//   };

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
                            <p className="p-in-cart">{item.productName} </p>
                            <p className="p-in-cart">מחיר: {item.price} </p>
                            <p className="p-in-cart"> כמות: {item.qty}</p>
                            <p className="p-in-cart">סה"כ מחיר: {item.price * item.qty} ₪</p>
                            {/* <input 
                                className="cnt-products"
                                type="number" 
                                value={item.qty} 
                                min="1"
                                onChange={(e) => changeQty(item._id, e.target.value)}
                            /> */}
                            <Counter item={item}/>
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => delItem(item._id)}/>
                            </IconButton >
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
