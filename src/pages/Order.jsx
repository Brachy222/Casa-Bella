import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../Styles/Order.css';

const Order = () => {
    const { register, handleSubmit, reset } = useForm();
    const cartItems = useSelector(state => state.cart.arr);
    const totalAmount = useSelector(state => state.cart.sum);

    console.log('Cart items:', cartItems);  
    console.log('Total amount:', totalAmount);

    useEffect(() => {
        reset({
            fullName: JSON.parse(localStorage.getItem('user')).userName,
            shippingStreet: '',
            shippingHouse: '',
            shippingCity: ''
        });
    }, [reset]);

    const onSubmit = async (data) => {
        // כאן תוכל לבצע קריאה לשרת כדי לאשר את ההזמנה
        console.log('Order data:', data);
        // לדוגמה, קריאה ל-API
        // await api.post('/orders', { ...data, items: cartItems });
    };

    return (
        <div>
            <h1>סיום הזמנה</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="end-personal-details">
                    <label>שם מלא:</label>
                    <input {...register('fullName', { required: true })} />
                    <label>כתובת למשלוח:</label>
                    <input type='text' {...register('shippingStreet', { required: true })} placeholder='רחוב'/>
                    <input type='number' {...register('shippingHouse', { required: true })} placeholder='מספר בית'/>
                    <input type='text' {...register('shippingCity', { required: true })} placeholder='עיר'/>

                </div>
                <h2>רשימת מוצרים:</h2>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt="img item" className="img-cart"/>
                            <h3>{item.productName}</h3>
                            <p>מחיר: {item.price} ₪</p>
                            <p>כמות: {item.qty}</p>
                        </li>
                    ))}
                </ul>
                <h3>סכום לתשלום: {totalAmount} ₪</h3>
                <button type="submit">אישור הזמנה</button>
            </form>
        </div>
    );
};

export default Order;
