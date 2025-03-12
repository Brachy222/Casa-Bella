import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/customers";

export const httpAddCustomer = (customer) => {
    return axios.post(baseUrl,customer
    //     {
    //     headers:{
    //         Authorization : `Berer ${token}`
    //     }
    // }
    );
}
export const httpLoginCustomer = (customer) =>{
    return axios.post(baseUrl+"/login",customer
    // {
    //     headers:{
    //         Authorization : `Berer ${token}`
    //     } 
    // }
    );
}
