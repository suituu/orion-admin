import request from "../utils/request";



export function getUsers(){

    return request.get(
        "/api/users"
    );

}





export function getUser(id){

    return request.get(
        `/api/users/${id}`
    );

}





export function getUserDetail(id){

    return request.get(
        `/api/users/${id}/detail`
    );

}
