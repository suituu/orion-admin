<template>

<div class="admin-layout">


<!-- 左侧固定菜单 -->

<aside class="sidebar">


<div class="brand">

<div class="logo">
ORION
</div>


<div class="subtitle">
智能设备运营中心
</div>


</div>


<el-menu

router

:default-active="$route.path"

class="menu"

>


<el-menu-item

v-for="menu in visibleMenus"

:key="menu.path"

:index="menu.path"

>


<el-icon>

<component :is="menu.icon" />

</el-icon>


<span>

{{menu.title}}

</span>


</el-menu-item>


</el-menu>


</aside>



<!-- 右侧区域 -->


<section class="content">


<header class="header">


<div class="page-title">

ORION 智能设备运营中心

</div>


<div class="header-right">


<div class="admin-info">

<div class="admin-name">

{{ admin.username || "管理员" }}

</div>


<div class="admin-role">

{{ admin.role || "-" }}

</div>

</div>

<el-button

type="danger"

size="small"

@click="logout"

>

{{ $t("common.logout") }}

</el-button>


</div>


</header>



<main class="main">


<router-view />


</main>



</section>


</div>


</template>
<script setup>


import {

useRouter

} from "vue-router";



import {

HomeFilled,

Box,

UploadFilled,

Monitor,

Key,

ShoppingCart,

Money,

Refresh,

User,

Setting

} from "@element-plus/icons-vue";



const router = useRouter();
const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
);


const menus = [

{
    path:"/",
    title:"控制台",
    icon:HomeFilled,
    roles:[
        "super",
        "admin",
        "operator",
        "support"
    ]
},


{
    path:"/users",
    title:"用户管理",
    icon:User,
    roles:[
        "super",
        "admin",
        "operator",
        "support"
    ]
},


{
    path:"/orders",
    title:"订单管理",
    icon:ShoppingCart,
    roles:[
        "super",
        "admin",
        "operator"
    ]
},


{
    path:"/payments",
    title:"支付管理",
    icon:Money,
    roles:[
        "super",
        "admin",
        "operator"
    ]
},


{
    path:"/devices",
    title:"设备管理",
    icon:Monitor,
    roles:[
        "super",
        "admin",
        "support"
    ]
},


{
    path:"/licenses",
    title:"授权管理",
    icon:Key,
    roles:[
        "super",
        "admin",
        "support"
    ]
},


{
    path:"/firmwares",
    title:"OTA固件",
    icon:UploadFilled,
    roles:[
        "super",
        "admin",
        "support"
    ]
},


{
    path:"/admins",
    title:"管理员",
    icon:Setting,
    roles:[
        "super"
    ]
}


];


const visibleMenus = menus.filter(

menu =>

menu.roles.includes(admin.role)

);


function logout(){


localStorage.removeItem(
"token"
);

localStorage.removeItem(
"admin"
);

router.push(
"/login"
);


}


</script>




<style scoped>


.admin-layout{


height:100vh;

width:100%;

overflow:hidden;

background:#F8FAFC;


}



/* 左侧菜单 */

.sidebar{


position:fixed;

left:0;

top:0;


width:240px;

height:100vh;


background:#111827;


z-index:20;


overflow:hidden;


}



.brand{


height:90px;

padding:20px;


}



.logo{


font-size:24px;

font-weight:700;

letter-spacing:2px;

color:#FFFFFF;


}



.subtitle{


margin-top:6px;

font-size:12px;

color:#94A3B8;


}





.menu{


border:none;

background:#111827;


}



.menu :deep(.el-menu-item){


height:48px;

color:#CBD5E1;


transition:all .2s ease;


}



.menu :deep(.el-menu-item:hover){


background:#1E293B;

cursor:pointer;


}



.menu :deep(.el-menu-item.is-active){


background:#2563EB;

color:#FFFFFF;


}






/* 右侧内容 */


.content{


margin-left:240px;


height:100vh;


display:flex;

flex-direction:column;


}



.header{


height:64px;


flex-shrink:0;


background:#FFFFFF;


border-bottom:1px solid #E5E7EB;


display:flex;

justify-content:space-between;

align-items:center;


padding:0 24px;


}



.page-title{


font-size:18px;

font-weight:600;


}



.header-right{


display:flex;

align-items:center;

gap:16px;


}

.admin-info{

display:flex;

flex-direction:column;

align-items:flex-end;

}


.admin-name{

font-size:14px;

font-weight:600;

color:#334155;

}


.admin-role{

font-size:12px;

color:#94A3B8;

margin-top:2px;

}

.admin-name{


font-size:14px;

color:#475569;


}





.main{


flex:1;


overflow-y:auto;


padding:24px;


box-sizing:border-box;


}



/* 滚动条 */

.main::-webkit-scrollbar{


width:8px;


}



.main::-webkit-scrollbar-thumb{


background:#CBD5E1;


border-radius:10px;


}



.main::-webkit-scrollbar-thumb:hover{


background:#94A3B8;


}





/* 所有按钮交互 */

:deep(.el-button){


transition:all .2s ease;


cursor:pointer;


}



:deep(.el-button:hover){


transform:translateY(-1px);


}



</style>
