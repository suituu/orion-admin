import request from "../utils/request";



export function getDashboard(){

    return request.get(
        "/api/admin/dashboard"
    );

}



export function getRevenueTrend(){

    return request.get(
        "/api/admin/dashboard/revenue"
    );

}



export function getOrderTrend(){

    return request.get(
        "/api/admin/dashboard/orders"
    );

}
