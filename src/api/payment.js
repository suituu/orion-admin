import request from "../utils/request";



export function getPayments(params = {}){

    return request.get(
        "/api/payments",
        {
            params,
        }
    );

}





export function getPayment(id){

    return request.get(
        `/api/payments/${id}`
    );

}
