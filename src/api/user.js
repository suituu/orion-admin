import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE;



function getAuthHeaders(){

    return {

        Authorization:
        `Bearer ${localStorage.getItem("token")}`,

    };

}



export function getUsers(){

    return axios.get(

        `${API_BASE}/api/users`,

        {
            headers:getAuthHeaders(),
        }

    );

}



export function getUser(id){

    return axios.get(

        `${API_BASE}/api/users/${id}`,

        {
            headers:getAuthHeaders(),
        }

    );

}
export function getUserDetail(id){

    return axios.get(

        `${API_BASE}/api/users/${id}/detail`,

        {
            headers:getAuthHeaders(),
        }

    );

}
