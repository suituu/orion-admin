<template>

<div class="page">


<el-card>


<div class="page-header">

<h2>
订单详情
</h2>


<span>
查看订单及授权信息
</span>


</div>


</el-card>





<el-card
class="section-card"
v-if="order"
>


<template #header>

订单信息

</template>



<el-descriptions

border

:column="2"

>


<el-descriptions-item label="订单ID">

{{order.id}}

</el-descriptions-item>



<el-descriptions-item label="订单编号">

{{order.order_no}}

</el-descriptions-item>



<el-descriptions-item label="用户账号">

{{order.username || "-"}}

</el-descriptions-item>



<el-descriptions-item label="邮箱">

{{order.email || "-"}}

</el-descriptions-item>



<el-descriptions-item label="产品名称">

{{order.product || "-"}}

</el-descriptions-item>



<el-descriptions-item label="订单金额">

¥{{order.amount}}

</el-descriptions-item>




<el-descriptions-item label="订单状态">


<el-tag

v-if="order.status==='paid'"

type="success"

>

已支付

</el-tag>



<el-tag

v-else

type="warning"

>

{{getOrderStatus(order.status)}}

</el-tag>


</el-descriptions-item>



<el-descriptions-item label="创建时间">

{{order.created_at}}

</el-descriptions-item>


</el-descriptions>


</el-card>






<el-card

class="section-card"

v-if="order"

>


<template #header>

授权信息

</template>



<el-descriptions

border

:column="2"

>



<el-descriptions-item label="授权码">

{{order.license_key || "-"}}

</el-descriptions-item>




<el-descriptions-item label="授权状态">


<el-tag

v-if="order.license_status==='active'"

type="success"

>

已激活

</el-tag>



<el-tag

v-else-if="order.license_status==='revoked'"

type="danger"

>

已撤销

</el-tag>



<el-tag

v-else

>

{{getLicenseStatus(order.license_status)}}

</el-tag>


</el-descriptions-item>




<el-descriptions-item label="绑定设备">

{{order.device_id || "未绑定"}}

</el-descriptions-item>




<el-descriptions-item label="激活时间">

{{order.activated_at || "-"}}

</el-descriptions-item>




<el-descriptions-item label="过期时间">

{{order.expires_at || "无限期"}}

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

getOrder

} from "../api/order";




const route = useRoute();


const order = ref(null);





function getOrderStatus(status){


const map={


created:"待支付",

pending:"处理中",

cancelled:"已取消"


};


return map[status] || status;


}




function getLicenseStatus(status){


const map={


unused:"未激活",

active:"已激活",

revoked:"已撤销"


};


return map[status] || status || "-";


}




async function loadOrder(){


try{


const res = await getOrder(

route.params.id

);


order.value=res.data.data;


}catch(err){


console.error(err);


}


}




onMounted(()=>{


loadOrder();


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
