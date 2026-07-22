import request from "../utils/request";



export function getProducts(){

    return request.get(
        "/api/products"
    );

}
