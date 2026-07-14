import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
    };
}

export function getFirmwares() {
    return axios.get(`${API_BASE}/api/admin/firmwares`, {
        headers: getAuthHeaders(),
    });
}

export function getFirmware(id) {
    return axios.get(
        `${API_BASE}/api/admin/firmwares/${id}`,
        {
            headers: getAuthHeaders(),
        }
    );
}

export function deleteFirmware(id) {
    return axios.delete(`${API_BASE}/api/admin/firmwares/${id}`, {
        headers: getAuthHeaders(),
    });
}

export function uploadFirmware(formData) {
    return axios.post(`${API_BASE}/api/admin/firmwares`, formData, {
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
        },
    });
}
