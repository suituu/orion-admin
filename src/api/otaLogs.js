import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;


function getAuthHeaders() {

    return {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    };

}


/**
 * Get OTA logs
 */
export function getOtaLogs() {

    return axios.get(
        `${API_BASE}/api/admin/ota-logs`,
        {
            headers: getAuthHeaders(),
        }
    );

}
