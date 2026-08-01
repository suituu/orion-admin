w<template>

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


<el-button
v-if="canChangeRole()"
type="primary"
@click="openRoleDialog"
>

修改角色

</el-button>


</el-card>



<el-dialog

v-model="roleDialogVisible"

title="修改管理员角色"

width="500px"

:close-on-click-modal="false"

>


<el-form
label-width="90px"
@submit.prevent="submitRoleChange"
>


<el-form-item label="管理员账号">

{{admin?.username}}

</el-form-item>


<el-form-item label="当前角色">

<el-tag>
{{roleLabel(admin?.role)}}
</el-tag>

</el-form-item>


<el-form-item label="新角色">

<el-select

v-model="selectedRole"

placeholder="请选择角色"

style="width:100%;"

>


<el-option

v-for="role in roleOptions"

:key="role.id"

:label="roleLabel(role.name)"

:value="role.name"

/>


</el-select>

</el-form-item>


</el-form>


<template #footer>


<el-button
:disabled="roleUpdating"
@click="roleDialogVisible=false"
>

取消

</el-button>


<el-button

type="primary"

:loading="roleUpdating"

@click="submitRoleChange"

>

确认修改

</el-button>


</template>


</el-dialog>





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

getRolePermissions,

updateAdminRole

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

const roleOptions = ref([]);

const roleDialogVisible = ref(false);

const selectedRole = ref("");

const roleUpdating = ref(false);


const currentAdmin =
JSON.parse(
localStorage.getItem("admin") || "{}"
);

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

function roleLabel(roleName){


const labels = {

    super:"超级管理员",

    admin:"管理员",

    operator:"运营人员",

    support:"客服"

};


return labels[roleName] || roleName;


}





function canChangeRole(){


return Boolean(
    admin.value &&
    [
        "super",
        "admin"
    ].includes(
        currentAdmin.role
    ) &&
    String(currentAdmin.id) !==
    String(admin.value.id) &&
    (
        currentAdmin.role === "super" ||
        admin.value.role !== "super"
    )
);


}





function openRoleDialog(){


if(!canChangeRole()){

return;

}


selectedRole.value =
admin.value.role;


roleDialogVisible.value = true;


}





async function submitRoleChange(){


if(!admin.value){

return;

}


if(!canChangeRole()){


error(
"不能修改自己的角色"
);


return;


}


const role =
selectedRole.value;


if(
    !roleOptions.value.some(
        item =>
        item.name === role
    )
){


error(
"请选择有效角色"
);


return;


}


if(role === admin.value.role){


roleDialogVisible.value = false;


return;


}


roleUpdating.value = true;


try{


await updateAdminRole(
admin.value.id,
role
);


success(
"管理员角色修改成功"
);


roleDialogVisible.value = false;


await loadAdmin();


}catch(err){


console.error(err);


const backendError =
err.response?.data?.error;


const errorMessages = {

    "Cannot change your own role":
        "不能修改自己的角色",

    "Role is required":
        "请选择角色",

    "Invalid role":
        "角色无效",

    "Role not found":
        "角色不存在",

    "Admin not found":
        "管理员不存在",

    "Only super administrators can assign the super role":
        "只有超级管理员可以授予超级管理员角色",

    "Only super administrators can change super account roles":
        "只有超级管理员可以修改超级管理员角色"

};


error(
errorMessages[backendError] ||
backendError ||
"管理员角色修改失败"
);


}finally{


roleUpdating.value = false;


}


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


roleOptions.value =
(
    Array.isArray(
        rolesResponse.data.data
    )
    ? rolesResponse.data.data
    : []
)
.filter(
    role =>
    currentAdmin.role === "super" ||
    role.name !== "super"
);


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

const role = roleOptions.value.find(
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
allPermissions
.filter(
permission =>
allowedCodes.has(
permission.code
)
)
.map(
permission => ({

...permission,

allowed:true

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
