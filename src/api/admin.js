import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export function adminLogin(username, password) {
    return axios.post(`${API_BASE}/api/admin/login`, {
        username,
        password,
    });
}


export function getAdmins(){

    return axios.get(
        `${API_BASE}/api/admin/admins`,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

}



export function getAdmin(id){

    return axios.get(
        `${API_BASE}/api/admin/admins/${id}`,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

}
