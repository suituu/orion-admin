import request from "../utils/request";



export function adminLogin(username, password) {

    return request.post(
        "/api/admin/login",
        {
            username,
            password,
        }
    );

}





export function getAdmins(){

    return request.get(
        "/api/admin/admins"
    );

}





export function getAdmin(id){

    return request.get(
        `/api/admin/admins/${id}`
    );

}
