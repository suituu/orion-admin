<template>

<div class="page">


<div class="page-header">

<h2>
固件详情
</h2>

<span>
查看版本信息和OTA升级配置
</span>

</div>




<el-card
class="section-card"
v-if="firmware"
>


<template #header>

固件信息

</template>




<el-descriptions

border

:column="2"

>



<el-descriptions-item label="编号">

{{firmware.id}}

</el-descriptions-item>




<el-descriptions-item label="版本号">

{{firmware.version}}

</el-descriptions-item>





<el-descriptions-item label="产品名称">

{{firmware.product_name || "-"}}

</el-descriptions-item>





<el-descriptions-item label="发布渠道">


<el-tag
v-if="firmware.channel==='stable'"
type="success"
>
正式版
</el-tag>


<el-tag
v-else-if="firmware.channel==='beta'"
type="warning"
>
测试版
</el-tag>


<el-tag
v-else
type="danger"
>
内部版
</el-tag>


</el-descriptions-item>





<el-descriptions-item label="硬件版本">

{{firmware.hardware_version}}

</el-descriptions-item>




<el-descriptions-item label="最低支持版本">

{{firmware.min_version}}

</el-descriptions-item>



</el-descriptions>


</el-card>







<el-card

class="section-card"

v-if="firmware"

>


<template #header>

文件信息

</template>




<el-descriptions

border

:column="2"

>


<el-descriptions-item label="文件名称">

{{firmware.file_name}}

</el-descriptions-item>




<el-descriptions-item label="文件大小">

{{firmware.file_size}} bytes

</el-descriptions-item>





<el-descriptions-item label="校验值">

{{firmware.checksum}}

</el-descriptions-item>





<el-descriptions-item label="下载地址">

{{firmware.download_url}}

</el-descriptions-item>



</el-descriptions>


</el-card>







<el-card

class="section-card"

v-if="firmware"

>


<template #header>

升级策略

</template>



<el-descriptions

border

:column="2"

>


<el-descriptions-item label="强制升级">


<el-tag
v-if="Number(firmware.force_update)===1"
type="danger"
>
是
</el-tag>


<el-tag
v-else
type="info"
>
否
</el-tag>


</el-descriptions-item>




<el-descriptions-item label="发布时间">

{{firmware.published_at}}

</el-descriptions-item>


</el-descriptions>


</el-card>







<el-card

class="section-card"

v-if="firmware"

>


<template #header>

更新说明

</template>



<div class="notes">

{{firmware.release_notes || "-"}}

</div>



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

getFirmware

} from "../api/firmware";




const route = useRoute();


const firmware = ref(null);





async function loadFirmware(){


try{


const res = await getFirmware(

route.params.id

);



firmware.value =
res.data.data;



}catch(err){


console.error(err);


}


}





onMounted(()=>{


loadFirmware();


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



.notes{


line-height:1.8;


white-space:pre-line;


}



</style>
