import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
         component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "firmwares",
        name: "Firmwares",
         component: () => import("../views/Firmwares.vue"),
 },
],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {

    const token = localStorage.getItem("token");

    if (to.path === "/login") {
        return next();
    }

    if (!token) {
        return next("/login");
    }

    next();

});
export default router;
