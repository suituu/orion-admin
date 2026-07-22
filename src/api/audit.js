import request from "../utils/request";


export function getAuditLogs(params){

    return request.get(
        "/api/admin/audit-logs",
        {
            params
        }
    );

}
