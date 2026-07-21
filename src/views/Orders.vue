<template>

<div class="orders-page">


<el-card>


<template #header>

<div class="page-header">


<h2>
订单管理
</h2>


<span>
查看和处理用户购买订单
</span>


</div>

</template>



<el-table

:data="orders"

border

style="width:100%"

>


<el-table-column

prop="id"

label="订单ID"

width="90"

/>



<el-table-column

prop="order_no"

label="订单编号"

width="230"

/>



<el-table-column

prop="username"

label="用户账号"

width="180"

/>



<el-table-column

prop="product"

label="产品名称"

width="160"

/>



<el-table-column

label="订单金额"

width="120"

>


<template #default="scope">

¥{{scope.row.amount}}

</template>


</el-table-column>
<el-table-column

label="订单状态"

width="120"

>


<template #default="scope">


<el-tag

v-if="scope.row.status === 'paid'"

type="success"

>

已支付

</el-tag>



<el-tag

v-else-if="scope.row.status === 'created'"

type="warning"

>

已创建

</el-tag>



<el-tag

v-else-if="scope.row.status === 'pending'"

type="info"

>

处理中

</el-tag>



<el-tag

v-else

>

{{ scope.row.status }}

</el-tag>



</template>


</el-table-column>





<el-table-column

prop="created_at"

label="创建时间"

width="190"

/>





<el-table-column

label="操作"

width="180"

fixed="right"

>


<template #default="scope">


<el-button

type="primary"

size="small"

@click="viewOrder(scope.row.id)"

>

查看详情

</el-button>





<el-button

v-if="scope.row.status === 'created'"

type="success"

size="small"

@click="handlePay(scope.row.id)"

>

确认支付

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
    getOrders,
    payOrder
} from "../api/order";



const orders = ref([]);


const router = useRouter();





function viewOrder(id){


    router.push(

        `/orders/${id}`

    );


}






async function loadOrders(){


    try{


        const res = await getOrders();


        orders.value =

        res.data.data;



    }catch(err){


        console.error(err);


    }


}






async function handlePay(id){



    if(!confirm("确认支付该订单吗？")){


        return;


    }




    try{


        const res = await payOrder(id);



        alert(

            "支付成功\n授权码："

            +

            res.data.data.license_key

        );



        await loadOrders();



    }catch(err){


        console.error(err);



        alert("支付失败");


    }



}







onMounted(()=>{


    loadOrders();


});



</script>
<style scoped>


.orders-page{


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



:deep(.el-card__header){


    font-weight:600;


}



</style>
