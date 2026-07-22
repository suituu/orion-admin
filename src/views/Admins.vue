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

v-if="scope.row.role==='super_admin'"

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

getAdmins

} from "../api/admin";



import axios from "axios";





const API_BASE =
import.meta.env.VITE_API_BASE;



const admins = ref([]);



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








async function createAdmin(){



const username =
prompt("请输入管理员账号");



const password =
prompt("请输入管理员密码");




if(!username || !password){


return;


}




try{


await axios.post(


`${API_BASE}/api/admin/admins`,


{


username,


password,


role:"admin"


},


{


headers:getHeaders()


}


);



alert("管理员创建成功");


loadAdmins();



}catch(err){


console.error(err);


alert("创建失败");


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



alert("删除成功");


loadAdmins();



}catch(err){


console.error(err);


alert("删除失败");


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
