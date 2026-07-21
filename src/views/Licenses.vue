<template>

<div class="page">


<div class="page-header">


<h2>
授权管理
</h2>


<span>
管理产品授权和设备绑定状态
</span>


</div>





<el-table

:data="licenses"

border

style="width:100%;margin-top:20px;"

>



<el-table-column

prop="id"

label="编号"

width="70"

/>




<el-table-column

prop="license_key"

label="授权码"

width="230"

/>





<el-table-column

prop="username"

label="用户账号"

width="150"

/>





<el-table-column

prop="order_no"

label="订单编号"

width="220"

/>





<el-table-column

prop="product"

label="产品名称"

width="160"

/>





<el-table-column

prop="device_id"

label="设备编号"

width="200"

/>





<el-table-column

label="授权状态"

width="120"

>


<template #default="scope">


<el-tag

v-if="scope.row.status==='active'"

type="success"

>

已激活

</el-tag>



<el-tag

v-else-if="scope.row.status==='revoked'"

type="danger"

>

已撤销

</el-tag>



<el-tag

v-else

type="info"

>

未激活

</el-tag>


</template>


</el-table-column>





<el-table-column

prop="activated_count"

label="激活次数"

width="100"

/>





<el-table-column

prop="activated_at"

label="激活时间"

width="180"

/>





<el-table-column

prop="created_at"

label="创建时间"

width="180"

/>





<el-table-column

label="操作"

width="120"

>


<template #default="scope">


<el-button

type="primary"

size="small"

@click="viewLicense(scope.row.license_key)"

>

查看详情

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

getLicenses

} from "../api/license";





const licenses = ref([]);



const router = useRouter();





function viewLicense(key){


router.push(

`/licenses/${key}`

);


}





async function loadLicenses(){


try{


const res = await getLicenses();



licenses.value = res.data.data;



}catch(err){


console.error(err);


}


}





onMounted(()=>{


loadLicenses();


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
