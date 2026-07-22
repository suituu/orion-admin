import axios from "axios";


const service = axios.create({

    baseURL:
    import.meta.env.VITE_API_BASE,

    timeout:10000

});





// 请求拦截

service.interceptors.request.use(

config=>{


const token =
localStorage.getItem("token");



if(token){

    config.headers.Authorization =
    `Bearer ${token}`;

}



return config;


},


error=>{

return Promise.reject(error);

}


);







// 响应拦截

service.interceptors.response.use(


response=>{


return response;


},


error=>{


if(
    error.response &&
    error.response.status === 401
){


    localStorage.removeItem("token");


    localStorage.removeItem("admin");


    window.location.href="/login";


}



return Promise.reject(error);


}


);





export default service;
