import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { httpAddOrder } from '../api/orderService';
import Swal from 'sweetalert2';
import '../Styles/Signup.css'; 
// import '../Styles/Order.css'; 

const Order = () => {
    const { register, handleSubmit, reset } = useForm();
    const cartItems = useSelector(state => state.cart.arr);
    const moneyToPay = useSelector(state => state.cart.sum);
    const navigate = useNavigate();

    useEffect(() => {
        reset({
            fullName: JSON.parse(localStorage.getItem('user'))?.userName || '',
            shippingStreet: '',
            shippingHouse: '',
            shippingCity: ''
        });
    }, [reset]);

    const onSubmit = async (data) => {
        console.log("נשלח לשרת:", data);
        let token  = localStorage.getItem("token");
        data = { ...data, products: cartItems, finallyPrice: moneyToPay };
        
        httpAddOrder(data, token)
            .then(() => {
                // alert("הזמנה בוצעה בהצלחה");
                Swal.fire({
                    title: "ההזמנה נקלטה בהצלחה",
                    icon: "success"
                })
                navigate("/Products");
            })
            .catch(err => {
                console.error("שגיאת שרת:", err);
                Swal.fire({
                    title: "שגיאה- הזמנה לא נקלטה ",
                    icon: "error"
                })
                
                alert(`שגיאה בהזמנה: ${err.response?.data?.message || "שגיאה לא ידועה"}`);
            });
    };

    return (
        <div className="register-container">
            <h2>סיום הזמנה</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="input-group">
                    <label className='labal-css'>שם מלא</label>
                    <input type="text" {...register('fullName', { required: "שדה חובה" })} />
                </div>

                <div className="input-group">
                    <label className='labal-css'>כתובת למשלוח</label>
                    <input type="text" {...register('shippingStreet', { required: "שדה חובה" })} placeholder="רחוב" />
                    <input type="number" {...register('shippingHouse', { required: "שדה חובה" })} placeholder="מספר בית" />
                    <input type="text" {...register('shippingCity', { required: "שדה חובה" })} placeholder="עיר" />
                </div>
                
                <h3>סכום לתשלום: {moneyToPay} ₪</h3>
                <button type="submit" className="register-button">אישור הזמנה</button>
            </form>
        </div>
    );
};

export default Order;
