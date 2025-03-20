import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/customers";

export const httpAddCustomer = (customer) => {
    return axios.post(baseUrl,customer );
}
// פונקציה לביצוע לוגין למשתמש קיים
export const httpLoginCustomer = (customer) =>{
    return axios.post(baseUrl+"/login",customer);
}
