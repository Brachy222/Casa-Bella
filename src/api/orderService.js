import axios from "axios"
import { useSelector } from "react-redux";


let baseUrl="https://project-in-node.onrender.com/api/orders";

export const httpAddOrder = (order,token) => {
    order={
        destDate : new Date(new Date().setDate(new Date().getDate() + 7)),
        address: order.shippingStreet + " " + order.shippingHouse + " " + order.shippingCity,
        cust_id: JSON.parse(localStorage.getItem("user"))._id,
        products: useSelector(state => state.cart.arr),
    }
    return axios.post(baseUrl,order,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}