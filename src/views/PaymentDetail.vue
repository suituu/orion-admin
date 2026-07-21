<template>

<div class="page">


<div class="page-header">

<h2>
交易详情
</h2>


<span>
查看支付和交易信息
</span>


</div>




<el-card
class="section-card"
>


<template #header>

支付信息

</template>



<el-descriptions

:column="2"

border

>


<el-descriptions-item label="交易编号">

{{payment.payment_no}}

</el-descriptions-item>



<el-descriptions-item label="订单编号">

{{payment.order_no}}

</el-descriptions-item>




<el-descriptions-item label="用户账号">

{{payment.username || "-"}}

</el-descriptions-item>




<el-descriptions-item label="邮箱">

{{payment.email || "-"}}

</el-descriptions-item>




<el-descriptions-item label="产品名称">

{{payment.product || "-"}}

</el-descriptions-item>




<el-descriptions-item label="支付渠道">

{{getProviderName(payment.provider)}}

</el-descriptions-item>




<el-descriptions-item label="交易金额">

¥{{payment.amount}}

</el-descriptions-item>




<el-descriptions-item label="货币">

{{payment.currency}}

</el-descriptions-item>




<el-descriptions-item label="支付状态">


<el-tag

v-if="payment.status==='paid'"

type="success"

>

已支付

</el-tag>



<el-tag

v-else-if="payment.status==='pending'"

type="warning"

>

处理中

</el-tag>



<el-tag

v-else-if="payment.status==='failed'"

type="danger"

>

支付失败

</el-tag>



<el-tag

v-else

>

{{payment.status}}

</el-tag>


</el-descriptions-item>




<el-descriptions-item label="交易流水">

{{payment.transaction_id || "-"}}

</el-descriptions-item>




<el-descriptions-item label="支付时间">

{{payment.paid_at || "-"}}

</el-descriptions-item>




<el-descriptions-item label="创建时间">

{{payment.created_at}}

</el-descriptions-item>




<el-descriptions-item label="失败原因">

{{payment.failure_reason || "-"}}

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
getPayment
} from "../api/payment";



const route = useRoute();



const payment = ref({});




function getProviderName(provider){


const map={


mock:"模拟支付",

wechat:"微信支付",

alipay:"支付宝"


};



return map[provider] || provider || "-";


}





async function loadPayment(){


try{


const res = await getPayment(

route.params.id

);



payment.value = res.data.data;



}catch(err){


console.error(err);


}


}




onMounted(()=>{


loadPayment();


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
