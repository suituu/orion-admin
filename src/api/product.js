import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE;



export function getProducts(){

    return axios.get(
        `${API_BASE}/api/products`
    );

}
