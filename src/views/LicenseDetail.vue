<template>

<div class="page">


<div class="page-header">

<h2>
授权详情
</h2>


<span>
查看授权状态和设备绑定信息
</span>


</div>




<el-card
class="section-card"
v-if="license"
>


<template #header>

授权信息

</template>




<el-descriptions

border

:column="2"

>



<el-descriptions-item label="授权码">

{{license.license_key}}

</el-descriptions-item>




<el-descriptions-item label="授权状态">


<el-tag

v-if="license.status==='active'"

type="success"

>

已激活

</el-tag>



<el-tag

v-else-if="license.status==='revoked'"

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



</el-descriptions-item>





<el-descriptions-item label="用户账号">

{{license.username || "-"}}

</el-descriptions-item>





<el-descriptions-item label="产品名称">

{{license.product || "-"}}

</el-descriptions-item>





<el-descriptions-item label="订单编号">

{{license.order_no || "-"}}

</el-descriptions-item>





<el-descriptions-item label="激活次数">

{{license.activated_count}}

/
{{license.activation_limit}}

</el-descriptions-item>





<el-descriptions-item label="激活时间">

{{license.activated_at || "-"}}

</el-descriptions-item>





<el-descriptions-item label="过期时间">

{{license.expires_at || "无限期"}}

</el-descriptions-item>





<el-descriptions-item label="创建时间">

{{license.created_at}}

</el-descriptions-item>



</el-descriptions>


</el-card>






<el-card

class="section-card"

v-if="license"

>


<template #header>

设备信息

</template>



<el-descriptions

border

:column="2"

>



<el-descriptions-item label="绑定设备">

{{license.device_id || "未绑定"}}

</el-descriptions-item>




<el-descriptions-item label="设备状态">

{{license.device_status || "-"}}

</el-descriptions-item>




<el-descriptions-item label="设备型号">

{{license.device_model || "-"}}

</el-descriptions-item>



<el-descriptions-item label="系统版本">

{{license.firmware_version || "-"}}

</el-descriptions-item>



</el-descriptions>



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



import {

getLicense

} from "../api/license";





const route = useRoute();



const license = ref(null);






async function loadLicense(){


try{


const res = await getLicense(

route.params.licenseKey

);



license.value = res.data.data;



}catch(err){


console.error(err);


}


}






onMounted(()=>{


loadLicense();


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




.section-card{


margin-top:20px;


}



:deep(.el-card__header){


font-weight:600;


}



</style>
