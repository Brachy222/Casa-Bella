import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/products";

export const httpAddProduct = (product,token) => {
    console.log(`product: ${product} token: ${token}`);
    return axios.post(baseUrl,product,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const httpUpdateProduct = (product, id, token) => {
    console.log("id in httpUpdateProduct: " , id);
    return axios.put(`${baseUrl}/${id}`,product,{
        headers:{
            "Authorization" : `Bearer ${token}`,
        }
    });
}

export const httpDeleteProduct = (id, token) => {
    console.log(`product: ${id} token: ${token}`);
    return axios.delete(baseUrl+"/"+id,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const httpGetproductById = (id) => {
    console.log("id in httpGetproductById: " , id)
    return axios.get(baseUrl+"/"+id);
}