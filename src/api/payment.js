import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function getAuthHeaders() {
    return {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    };
}
export function getPayments(params = {}) {
    return axios.get(
        `${API_BASE}/api/payments`,
        {
            headers: getAuthHeaders(),
            params,
        }
    );
}
export function getPayment(id) {
    return axios.get(
        `${API_BASE}/api/payments/${id}`,
        {
            headers: getAuthHeaders(),
        }
    );
}
