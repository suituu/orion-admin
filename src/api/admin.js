import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export function adminLogin(username, password) {
    return axios.post(`${API_BASE}/api/admin/login`, {
        username,
        password,
    });
}
