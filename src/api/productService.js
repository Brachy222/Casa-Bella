import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/products";

export const httpAddProduct = (product,token) => {
    return axios.post(baseUrl,product,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const httpUpdateProduct = (product, token) => {
    return axios.put(baseUrl+"/"+product._id,product,{
        headers:{
            "Authorization" : `Bearer ${token}`,
            "try": "hello"
        }
    });
}

export const httpDeleteProduct = (id, token) => {
    return axios.delete(baseUrl+"/"+id,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const httpGetproductById = (id) => {
    return axios.get(baseUrl+"/"+id);
}