import request from "../utils/request";



export function getOtaLogs(){

    return request.get(
        "/api/admin/ota-logs"
    );

}
