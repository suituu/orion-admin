import request from "../utils/request";



export function getOrders(){

    return request.get(
        "/api/admin/orders"
    );

}





export function getOrder(id){

    return request.get(
        `/api/admin/orders/${id}`
    );

}





export function payOrder(id){

    return request.put(
        `/api/admin/orders/${id}/pay`,
        {}
    );

}
