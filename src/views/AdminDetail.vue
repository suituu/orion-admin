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



<el-descriptions
border
:column="2"
>


<el-descriptions-item label="用户管理">

<el-tag type="success">
允许
</el-tag>

</el-descriptions-item>



<el-descriptions-item label="订单管理">

<el-tag type="success">
允许
</el-tag>

</el-descriptions-item>



<el-descriptions-item label="支付管理">

<el-tag type="success">
允许
</el-tag>

</el-descriptions-item>



<el-descriptions-item label="设备管理">

<el-tag type="success">
允许
</el-tag>

</el-descriptions-item>



<el-descriptions-item label="OTA管理">

<el-tag type="success">
允许
</el-tag>

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

getAdmin

} from "../api/admin";




const route = useRoute();



const admin = ref(null);



const API_BASE =
import.meta.env.VITE_API_BASE;





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



alert(
"密码修改成功"
);



}catch(err){


console.error(err);


alert(
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



</style>
