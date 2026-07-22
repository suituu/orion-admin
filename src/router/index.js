import { createRouter, createWebHistory } from "vue-router";


const routes = [

{
    path:"/login",
    name:"Login",
    component:()=>import("../views/Login.vue"),
},

{
 path:"/403",
 name:"Forbidden",
 component:()=>import("../views/403.vue"),
},

{
    path:"/",
    component:()=>import("../layouts/AdminLayout.vue"),


    children:[


    {
        path:"",
        name:"Dashboard",
        component:()=>import("../views/Dashboard.vue"),
    },



    {
        path:"products",
        name:"Products",
        component:()=>import("../views/Products.vue"),
        meta:{
            roles:[
                "super",
                "admin"
            ]
        }
    },



    {
        path:"firmwares",
        name:"Firmwares",
        component:()=>import("../views/Firmwares.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"firmwares/:id",
        name:"FirmwareDetail",
        component:()=>import("../views/FirmwareDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"devices",
        name:"Devices",
        component:()=>import("../views/Devices.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"devices/:deviceId",
        name:"DeviceDetail",
        component:()=>import("../views/DeviceDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"licenses",
        name:"Licenses",
        component:()=>import("../views/Licenses.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"licenses/:licenseKey",
        name:"LicenseDetail",
        component:()=>import("../views/LicenseDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"orders",
        name:"Orders",
        component:()=>import("../views/Orders.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator"
            ]
        }
    },



    {
        path:"orders/:id",
        name:"OrderDetail",
        component:()=>import("../views/OrderDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator"
            ]
        }
    },



    {
        path:"payments",
        name:"Payments",
        component:()=>import("../views/Payments.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator"
            ]
        }
    },



    {
        path:"payments/:id",
        name:"PaymentDetail",
        component:()=>import("../views/PaymentDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator"
            ]
        }
    },



    {
        path:"ota-logs",
        name:"OtaLogs",
        component:()=>import("../views/OtaLogs.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "support"
            ]
        }
    },



    {
        path:"users",
        name:"Users",
        component:()=>import("../views/Users.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator",
                "support"
            ]
        }
    },



    {
        path:"users/:id",
        name:"UserDetail",
        component:()=>import("../views/UserDetail.vue"),
        meta:{
            roles:[
                "super",
                "admin",
                "operator",
                "support"
            ]
        }
    },



    {
        path:"admins",
        name:"Admins",
        component:()=>import("../views/Admins.vue"),
        meta:{
            roles:[
                "super"
            ]
        }
    },



    {
        path:"admins/:id",
        name:"AdminDetail",
        component:()=>import("../views/AdminDetail.vue"),
        meta:{
            roles:[
                "super"
            ]
        }
    },


    ]

}

];





const router=createRouter({

history:createWebHistory(),

routes

});







router.beforeEach((to,from,next)=>{


const token =
localStorage.getItem("token");




if(to.path === "/login"){

    return next();

}





if(!token){

    return next("/login");

}






const admin =
JSON.parse(
    localStorage.getItem("admin") || "{}"
);



const role =
admin.role;





if(
    to.meta.roles &&
    !to.meta.roles.includes(role)
){

return next("/403");

    return next("/");


}





next();


});





export default router;
