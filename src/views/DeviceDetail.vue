<template>

<div class="page">


<div class="page-header">

<h2>
设备详情
</h2>


<span>
查看设备运行状态、授权和升级记录
</span>


</div>





<el-card
class="section-card"
v-if="device"
>


<template #header>

设备信息

</template>



<el-descriptions

border

:column="2"

>


<el-descriptions-item label="设备ID">

{{device.device_id}}

</el-descriptions-item>



<el-descriptions-item label="用户账号">

{{device.username || "-"}}

</el-descriptions-item>



<el-descriptions-item label="产品名称">

{{device.product || "-"}}

</el-descriptions-item>



<el-descriptions-item label="设备型号">

{{device.model || "-"}}

</el-descriptions-item>



<el-descriptions-item label="硬件版本">

{{device.hardware_version || "-"}}

</el-descriptions-item>



<el-descriptions-item label="序列号">

{{device.serial_number || "-"}}

</el-descriptions-item>



<el-descriptions-item label="MAC地址">

{{device.mac_address || "-"}}

</el-descriptions-item>


</el-descriptions>


</el-card>







<el-card

class="section-card"

v-if="device"

>


<template #header>

运行状态

</template>



<el-descriptions

border

:column="2"

>


<el-descriptions-item label="系统版本">

{{device.firmware_version}}

</el-descriptions-item>




<el-descriptions-item label="设备状态">


<el-tag

v-if="device.status==='online'"

type="success"

>

在线

</el-tag>



<el-tag

v-else-if="device.status==='inactive'"

type="warning"

>

未激活

</el-tag>



<el-tag

v-else

type="info"

>

离线

</el-tag>


</el-descriptions-item>




<el-descriptions-item label="最后心跳">

{{device.last_seen}}

</el-descriptions-item>




<el-descriptions-item label="创建时间">

{{device.created_at}}

</el-descriptions-item>



</el-descriptions>


</el-card>






<el-card

class="section-card"

v-if="device"

>


<template #header>

授权信息

</template>



<el-descriptions

border

:column="2"

>


<el-descriptions-item label="授权码">

{{device.license_key || "未授权"}}

</el-descriptions-item>




<el-descriptions-item label="授权状态">


<el-tag

v-if="device.license_status==='active'"

type="success"

>

已激活

</el-tag>



<el-tag

v-else-if="device.license_status==='revoked'"

type="danger"

>

已撤销

</el-tag>



<el-tag

v-else

type="info"

>

未授权

</el-tag>


</el-descriptions-item>




<el-descriptions-item label="激活时间">

{{device.activated_at || "-"}}

</el-descriptions-item>



</el-descriptions>


</el-card>







<el-card

class="section-card"

v-if="device"

>


<template #header>

OTA升级统计

</template>



<el-descriptions

border

:column="3"

>


<el-descriptions-item label="升级次数">

{{device.ota_count || 0}}

</el-descriptions-item>




<el-descriptions-item label="成功次数">

{{device.ota_success || 0}}

</el-descriptions-item>




<el-descriptions-item label="最后升级">

{{device.last_ota_time || "-"}}

</el-descriptions-item>


</el-descriptions>


</el-card>







<el-card

class="section-card"

>


<template #header>

OTA升级记录

</template>




<el-table

:data="otaLogs"

border

>



<el-table-column

prop="from_version"

label="原版本"

width="120"

/>



<el-table-column

prop="to_version"

label="目标版本"

width="120"

/>



<el-table-column

prop="firmware_version"

label="系统版本"

width="120"

/>




<el-table-column

label="状态"

width="120"

>


<template #default="scope">


<el-tag

v-if="scope.row.status==='downloaded'"

type="success"

>

已完成

</el-tag>



<el-tag

v-else

>

{{scope.row.status}}

</el-tag>


</template>


</el-table-column>




<el-table-column

prop="created_at"

label="时间"

width="200"

/>



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

useRoute

} from "vue-router";


import {

getDevice,

getDeviceOtaLogs

} from "../api/device";





const route = useRoute();



const device = ref(null);


const otaLogs = ref([]);





async function loadDevice(){


try{


const res = await getDevice(

route.params.deviceId

);



device.value=res.data.data;



}catch(err){


console.error(err);


}


}






async function loadOtaLogs(){


try{


const res = await getDeviceOtaLogs(

route.params.deviceId

);



otaLogs.value=res.data.data;



}catch(err){


console.error(err);


}


}




onMounted(()=>{


loadDevice();


loadOtaLogs();


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
