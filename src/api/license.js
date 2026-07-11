import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;


function getAuthHeaders() {
    return {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    };
}


export function getLicenses() {

    return axios.get(
        `${API_BASE}/api/licenses`,
        {
            headers: getAuthHeaders(),
        }
    );

}
export function getLicense(licenseKey) {

    return axios.get(
        `${API_BASE}/api/licenses/${licenseKey}`,
        {
            headers: getAuthHeaders(),
        }
    );

}
