import axios from "axios"

let baseUrl="https://project-in-node.onrender.com/api/orders";

export const httpAddOrder = (order, products ,token) => {
    order={
        destDate : new Date(new Date().setDate(new Date().getDate() + 7)),
        address: order.shippingStreet + " " + order.shippingHouse + " " + order.shippingCity,
        cust_id : JSON.parse(localStorage.getItem("user"))._id,
        products: products,
    }
    return axios.post(baseUrl,order,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}