import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Counter from "../components/counter";
import "../Styles/cart.css";

// import React, { useState } from 'react';
// import { Button, Box, Typography } from '@mui/material';

const Cart = () => {
  const cart = useSelector(state => state.cart.arr);
  const user = JSON.parse(localStorage.getItem("user"));
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
      if (user) {
          navigate("/order");
      } else {
          alert("משתמש לא רשום, נא בצע כניסה");
          navigate("/login");
      }
  };

  return (
      <div className="cart-div">

          {cart.length === 0 ? ( // בדיקה אם הסל ריק
              <p style={{ fontSize: "20px", textAlign: "center", marginTop: "40px" }}>
                   לא נמצאו מוצרים בסל הקניות
              </p>
          ) : (
              <>
                        <h2 id="h2-div">עגלת קניות</h2>
                  <ul>
                      {cart.map(item => (
                          <li key={item._id} className="li-cart">
                              <img src={item.image} alt="img item" className="img-cart"/>
                              <div className="div-in-cart">
                                  <p className="p-in-cart">{item.productName} </p>
                                  <p className="p-in-cart">מחיר: {item.price} </p>
                                  <p className="p-in-cart">כמות: {item.qty}</p>
                                  <p className="p-in-cart">סה"כ מחיר: {item.price * item.qty} ₪</p>
                                  <Counter item={item}/>
                                  <IconButton aria-label="delete" onClick={() => delItem(item._id)}>
                                      <DeleteIcon />
                                  </IconButton>
                              </div>
                          </li>
                      ))}
                  </ul>

                  <div className="cart-summary-div">
                      <p>סה"כ מוצרים: {totalCount}</p>
                      <p className="sum">סה"כ לתשלום: {totalSum} ₪</p>
                      <p>
                          <input type="checkbox" id="terms" name="terms" />
                          <label htmlFor="terms">אני מסכים/ה לתנאי השימוש.</label>
                      </p>
                      <button className="order-button" onClick={goToOrderPage}>
                          לתשלום והזמנה
                      </button>
                  </div>
              </>
          )}
      </div>
  );
};

export default Cart;

