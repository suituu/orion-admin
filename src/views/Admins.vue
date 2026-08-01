<template>

<div class="page">


<div class="page-header">


<div>

<h2>
管理员管理
</h2>


<span>
管理后台账号和权限角色
</span>


</div>



<el-button
type="primary"
@click="createAdmin"
>
新增管理员
</el-button>


</div>



<el-dialog

v-model="createDialogVisible"

title="新增管理员"

width="520px"

:close-on-click-modal="false"

>


<el-form

label-width="90px"

@submit.prevent="submitCreateAdmin"

>


<el-form-item label="管理员账号">


<el-input

v-model="createForm.username"

placeholder="请输入管理员账号"

maxlength="64"

clearable

autocomplete="off"

/>


</el-form-item>



<el-form-item label="登录密码">


<el-input

v-model="createForm.password"

type="password"

placeholder="请输入 8-128 位密码"

maxlength="128"

show-password

autocomplete="new-password"

/>


</el-form-item>



<el-form-item label="角色">


<el-select

v-model="createForm.role"

placeholder="请选择角色"

:loading="rolesLoading"

style="width:100%;"

>


<el-option

v-for="role in roles"

:key="role.id"

:label="roleLabel(role.name)"

:value="role.name"

/>


</el-select>


</el-form-item>


</el-form>



<template #footer>


<el-button

@click="createDialogVisible=false"

>

取消

</el-button>


<el-button

type="primary"

:loading="createSubmitting"

@click="submitCreateAdmin"

>

创建管理员

</el-button>


</template>


</el-dialog>

<el-table

:data="admins"

border

style="width:100%;margin-top:20px;"

>




<el-table-column

prop="id"

label="编号"

width="80"

/>





<el-table-column

prop="username"

label="账号"

width="200"

/>





<el-table-column

label="角色"

width="160"

>


<template #default="scope">


<el-tag

v-if="scope.row.role==='super'"

type="danger"

>

超级管理员

</el-tag>



<el-tag

v-else-if="scope.row.role==='operator'"

type="warning"

>

运营人员

</el-tag>



<el-tag

v-else-if="scope.row.role==='support'"

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



</template>


</el-table-column>





<el-table-column

prop="created_at"

label="创建时间"

width="200"

/>





<el-table-column

label="操作"

width="220"

>



<template #default="scope">


<el-button

type="primary"

size="small"

@click="viewAdmin(scope.row.id)"

>

查看详情

</el-button>



<el-button

type="danger"

size="small"

@click="deleteAdmin(scope.row.id)"

>

删除

</el-button>



</template>



</el-table-column>




</el-table>



</div>


</template>





<script setup>


import {

ref,

onMounted

} from "vue";



import {

useRouter

} from "vue-router";



import {

getAdmins,

getRoles

}from "../api/admin";

import {
    success,
    error
} from "../utils/message";

import axios from "axios";





const API_BASE =
import.meta.env.VITE_API_BASE;



const admins = ref([]);

const roles = ref([]);

const rolesLoading = ref(false);

const createDialogVisible = ref(false);

const createSubmitting = ref(false);

const createForm = ref({

    username:"",

    password:"",

    role:"admin"

});

const router = useRouter();







function getHeaders(){


return {


Authorization:

`Bearer ${localStorage.getItem("token")}`


};


}








async function loadAdmins(){


try{


const res = await getAdmins();



admins.value =

res.data.data;



}catch(err){


console.error(err);


}


}







function viewAdmin(id){


router.push(

`/admins/${id}`

);


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





async function loadRoles(){


rolesLoading.value = true;


try{


const res =
await getRoles();


roles.value =
Array.isArray(res.data.data)
? res.data.data
: [];


if(
    !roles.value.some(
        role =>
        role.name === createForm.value.role
    )
){


const defaultRole =
roles.value.find(
    role =>
    role.name === "admin"
);


createForm.value.role =
defaultRole
? defaultRole.name
: roles.value[0]?.name || "";


}


}catch(err){


console.error(err);


roles.value = [];


error(
"角色列表加载失败"
);


}finally{


rolesLoading.value = false;


}


}





async function createAdmin(){


createForm.value = {

    username:"",

    password:"",

    role:"admin"

};


createDialogVisible.value = true;


if(roles.value.length === 0){


await loadRoles();


}


}





async function submitCreateAdmin(){


const username =
createForm.value.username.trim();


const password =
createForm.value.password;


const role =
createForm.value.role;


if(!username){


error(
"请输入管理员账号"
);


return;


}


if(
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
){


error(
"密码长度必须为 8-128 位"
);


return;


}


if(
    !roles.value.some(
        item =>
        item.name === role
    )
){


error(
"请选择有效角色"
);


return;


}


createSubmitting.value = true;


try{


await axios.post(


`${API_BASE}/api/admin/admins`,


{

    username,

    password,

    role

},


{

    headers:getHeaders()

}


);


success(
"管理员创建成功"
);


createDialogVisible.value = false;


createForm.value = {

    username:"",

    password:"",

    role:"admin"

};


await loadAdmins();


}catch(err){


console.error(err);


const backendError =
err.response?.data?.error;


const errorMessages = {

    "Invalid username":
        "管理员账号无效",

    "Password must be between 8 and 128 characters":
        "密码长度必须为 8-128 位",

    "Invalid role":
        "角色无效",

    "Role not found":
        "角色不存在",

    "Admin username already exists":
        "管理员账号已存在",

    "Only super administrators can create super accounts":
        "只有超级管理员可以创建超级管理员账号"

};


error(
errorMessages[backendError] ||
backendError ||
"创建失败"
);


}finally{


createSubmitting.value = false;


}


}









async function deleteAdmin(id){


if(!confirm("确定删除该管理员？")){


return;


}





try{


await axios.delete(


`${API_BASE}/api/admin/admins/${id}`,


{


headers:getHeaders()


}


);



success("删除成功");

loadAdmins();



}catch(err){


console.error(err);


error("删除失败");

}


}







onMounted(()=>{


loadAdmins();


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


font-size:22px;


}





.page-header span{


color:#909399;


font-size:14px;


}



</style>
