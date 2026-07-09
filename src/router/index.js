import { createRouter, createWebHistory } from "vue-router";


const routes = [

  // 登录页面
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },


  // 后台布局
  {
    path: "/",
    component: () => import("../layouts/AdminLayout.vue"),

    children: [

      // Dashboard
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },


      // Firmware
      {
        path: "firmwares",
        name: "Firmwares",
        component: () => import("../views/Firmwares.vue"),
      },


      // Device List
      {
        path: "devices",
        name: "Devices",
        component: () => import("../views/Devices.vue"),
      },


      // Device Detail
      {
        path: "devices/:deviceId",
        name: "DeviceDetail",
        component: () => import("../views/DeviceDetail.vue"),
      },
      
{
        path: "licenses",
        name: "Licenses",
        component: () => import("../views/Licenses.vue"),
      },
    ],
  },

];



const router = createRouter({

  history: createWebHistory(),

  routes,

});



// JWT 权限验证

router.beforeEach((to, from, next) => {


  const token = localStorage.getItem("token");


  // 登录页直接允许访问

  if (to.path === "/login") {

    return next();

  }


  // 没有 Token 跳登录

  if (!token) {

    return next("/login");

  }


  next();


});



export default router;
