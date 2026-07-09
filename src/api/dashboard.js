import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE;


function getAuthHeaders() {

    return {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    };

}



export function getDashboard() {

    return axios.get(
        `${API_BASE}/api/admin/dashboard`,
        {
            headers: getAuthHeaders(),
        }
    );

}
