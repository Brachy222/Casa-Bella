import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/customers";

export const httpAddCustomer = (customer) => {
    return axios.post(baseUrl,customer);
}
