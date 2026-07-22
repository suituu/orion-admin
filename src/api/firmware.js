import request from "../utils/request";



export function getFirmwares(){

    return request.get(
        "/api/admin/firmwares"
    );

}





export function getFirmware(id){

    return request.get(
        `/api/admin/firmwares/${id}`
    );

}





export function deleteFirmware(id){

    return request.delete(
        `/api/admin/firmwares/${id}`
    );

}





export function uploadFirmware(formData){

    return request.post(
        "/api/admin/firmwares",
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data",
            },
        }
    );

}
