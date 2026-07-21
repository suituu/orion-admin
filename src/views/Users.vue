<template>

<div class="users-page">


<el-card>


<template #header>

<div class="page-header">

<h2>
用户中心
</h2>

<span>
用户列表
</span>

</div>

</template>



<el-table

:data="users"

border

style="width:100%"

>


<el-table-column

prop="id"

label="用户ID"

width="90"

/>



<el-table-column

prop="username"

label="用户名"

width="220"

/>



<el-table-column

label="邮箱"

width="220"

>

<template #default="scope">

{{ scope.row.email || "-" }}

</template>

</el-table-column>



<el-table-column

prop="orders"

label="订单数量"

width="110"

/>



<el-table-column

prop="payments"

label="交易次数"

width="110"

/>



<el-table-column

prop="licenses"

label="授权数量"

width="110"

/>



<el-table-column

prop="devices"

label="设备数量"

width="110"

/>



<el-table-column

prop="created_at"

label="注册时间"

width="190"

/>



<el-table-column

label="操作"

width="120"

fixed="right"

>


<template #default="scope">


<el-button

type="primary"

size="small"

@click="viewUser(scope.row.id)"

>

查看详情

</el-button>


</template>


</el-table-column>



</el-table>


</el-card>


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

getUsers

} from "../api/user";



const users = ref([]);


const router = useRouter();




async function loadUsers(){


try{


const res = await getUsers();


users.value = res.data.data;


}catch(err){


console.error(err);


}


}





function viewUser(id){


router.push(

`/users/${id}`

);


}





onMounted(()=>{


loadUsers();


});


</script>



<style scoped>


.users-page{


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
