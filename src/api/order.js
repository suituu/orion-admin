import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE;



function getAuthHeaders(){

    return {

        Authorization:
            `Bearer ${localStorage.getItem("token")}`,

    };

}



export function getOrders(){

    return axios.get(

        `${API_BASE}/api/admin/orders`,

        {
            headers:getAuthHeaders(),
        }

    );

}
export function payOrder(id){

    return axios.put(
        `${API_BASE}/api/admin/orders/${id}/pay`,
        {},
        {
            headers:getAuthHeaders(),
        }
    );

}
