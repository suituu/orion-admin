<template>

<div class="page">


<div class="page-header">

<div>

<h2>
管理员详情
</h2>

<span>
查看账号权限和安全信息
</span>

</div>

</div>





<el-card
v-if="admin"
class="section-card"
>


<template #header>

基础信息

</template>



<el-descriptions
border
:column="2"
>


<el-descriptions-item label="编号">

{{admin.id}}

</el-descriptions-item>



<el-descriptions-item label="账号">

{{admin.username}}

</el-descriptions-item>





<el-descriptions-item label="角色">


<el-tag
v-if="admin.role==='super'"
type="danger"
>
超级管理员
</el-tag>


<el-tag
v-else-if="admin.role==='operator'"
type="warning"
>
运营人员
</el-tag>


<el-tag
v-else-if="admin.role==='support'"
type="success"
>
客服
</el-tag>


<el-tag
v-else
type="info"
>
管理员
</el-tag>



</el-descriptions-item>





<el-descriptions-item label="创建时间">

{{admin.created_at}}

</el-descriptions-item>



</el-descriptions>


</el-card>







<el-card
v-if="admin"
class="section-card"
>


<template #header>

权限信息

</template>



<div
v-if="permissionsLoading"
class="permission-state"
>
权限信息加载中...
</div>


<el-alert
v-else-if="permissionsError"
:title="permissionsError"
type="error"
:closable="false"
show-icon
/>


<el-empty
v-else-if="permissionItems.length===0"
description="暂无权限信息"
/>


<el-descriptions
v-else
border
:column="2"
>


<el-descriptions-item
v-for="permission in permissionItems"
:key="permission.id"
:label="permissionLabel(permission.code)"
>


<el-tag
:type="permission.allowed ? 'success' : 'info'"
>
{{permission.allowed ? "允许" : "禁止"}}
</el-tag>


<span class="permission-code">
{{permission.code}}
</span>


</el-descriptions-item>


</el-descriptions>


</el-card>







<el-card
v-if="admin"
class="section-card"
>


<template #header>

安全操作

</template>



<el-button
type="warning"
@click="resetPassword"
>

修改密码

</el-button>



</el-card>





</div>


</template>





<script setup>


import {

ref,

onMounted

} from "vue";


import {

useRoute

} from "vue-router";


import axios from "axios";


import {

getAdmin,

getRoles,

getPermissions,

getRolePermissions

} from "../api/admin";

import {
    success,
    error
} from "../utils/message";


const route = useRoute();



const admin = ref(null);

const permissionItems = ref([]);

const permissionsLoading = ref(false);

const permissionsError = ref("");

const API_BASE =
import.meta.env.VITE_API_BASE;



function permissionLabel(code){

    const labels = {

        USER_VIEW:"用户查看",

        USER_EDIT:"用户与管理员编辑",

        ORDER_VIEW:"订单查看",

        ORDER_PAY:"订单支付处理",

        DEVICE_VIEW:"设备查看",

        DEVICE_BIND:"设备绑定",

        OTA_VIEW:"OTA 查看",

        OTA_RELEASE:"固件发布",

        AUDIT_VIEW:"审计日志查看"

    };


    return labels[code] || code;

}

function headers(){


return {


Authorization:

`Bearer ${localStorage.getItem("token")}`


};


}







async function loadAdmin(){


try{


const res =
await getAdmin(
route.params.id
);


admin.value =
res.data.data;


}catch(err){


console.error(err);


error(
"管理员信息加载失败"
);


return;


}


permissionsLoading.value = true;

permissionsError.value = "";

permissionItems.value = [];


try{


const [
rolesResponse,
permissionsResponse
] = await Promise.all([

getRoles(),

getPermissions()

]);


const roles =
Array.isArray(
rolesResponse.data.data
)
? rolesResponse.data.data
: [];


const allPermissions =
Array.isArray(
permissionsResponse.data.data
)
? permissionsResponse.data.data
: [];


let allowedCodes;


if(admin.value.role === "super"){


allowedCodes = new Set(

allPermissions.map(
permission => permission.code
)

);


}else{


const role = roles.find(
item =>
item.name === admin.value.role
);


if(!role){

throw new Error(
"Admin role not found"
);

}


const rolePermissionsResponse =
await getRolePermissions(
role.id
);


const rolePermissions =
Array.isArray(
rolePermissionsResponse.data.data
)
? rolePermissionsResponse.data.data
: [];


allowedCodes = new Set(

rolePermissions.map(
permission => permission.code
)

);


}


permissionItems.value =
allPermissions.map(
permission => ({

...permission,

allowed:
allowedCodes.has(
permission.code
)

})
);


}catch(err){


console.error(err);


permissionsError.value =
"权限信息加载失败";


}finally{


permissionsLoading.value = false;


}


}




async function resetPassword(){


const password =
prompt(
"请输入新密码"
);


if(!password){

return;

}


try{


await axios.put(


`${API_BASE}/api/admin/admins/${route.params.id}/password`,


{

password

},


{

headers:headers()

}


);


success(
"密码修改成功"
);


}catch(err){


console.error(err);


error(
"修改失败"
);


}


}


onMounted(()=>{


loadAdmin();


});



</script>





<style scoped>


.page{

padding:20px;

}



.page-header{


display:flex;


justify-content:space-between;


align-items:center;


}



.page-header h2{


margin:0;


}



.page-header span{


color:#909399;


font-size:14px;


}



.section-card{


margin-top:20px;


}

.permission-state{

color:#909399;

font-size:14px;

}


.permission-code{

margin-left:10px;

color:#909399;

font-size:12px;

}

</style>
