import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function getAuthHeaders() {
    return {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    };
}


export function getDevices() {
    return axios.get(
        `${API_BASE}/api/devices`,
        {
            headers: getAuthHeaders(),
        }
    );
}


export function getDevice(deviceId) {
    return axios.get(
        `${API_BASE}/api/devices/${deviceId}`,
        {
            headers: getAuthHeaders(),
        }
    );
}


export function getDeviceOtaLogs(deviceId) {

    return axios.get(
        `${API_BASE}/api/devices/${deviceId}/ota-logs`,
        {
            headers: getAuthHeaders(),
        }
    );

}
