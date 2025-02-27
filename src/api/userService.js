import axios from "axios"


let baseUrl="https://project-in-node.onrender.com/api/user";

export const httpAddUser = (user) => {
    return axios.post(baseUrl,user);
}
