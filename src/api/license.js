import request from "../utils/request";


export function getLicenses(){

    return request.get(
        "/api/licenses"
    );

}



export function getLicense(licenseKey){

    return request.get(
        `/api/licenses/${licenseKey}`
    );

}
