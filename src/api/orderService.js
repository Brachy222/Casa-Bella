import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/orders";

export const httpAddOrder = (order,token) => {
    return axios.post(baseUrl,order,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}