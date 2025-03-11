import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/products";

export const httpAddProduct = (product) => {
    return axios.post(baseUrl,product);
}

export const httpUpdateProduct = (product) => {
    return axios.put(baseUrl+"/"+product.productName,product);
}

export const httpDeleteProduct = (id) => {
    return axios.delete(baseUrl+"/"+id);
}