import request from "../utils/request";


export function getDevices(){

    return request.get(
        "/api/devices"
    );

}


export function getDevice(deviceId){

    return request.get(
        `/api/devices/${deviceId}`
    );

}


export function getDeviceOtaLogs(deviceId){

    return request.get(
        `/api/devices/${deviceId}/ota-logs`
    );

}
