<template>

<div class="dashboard">


<!-- 核心数据 -->


<el-row
:gutter="20"
class="stats-row"
>


<el-col :span="6">

<el-card class="stat-card">

<div class="card-title">
{{ $t("dashboard.users") }}
</div>


<div class="card-number">
{{ data.users }}
</div>


</el-card>

</el-col>



<el-col :span="6">

<el-card class="stat-card">

<div class="card-title">
{{ $t("dashboard.orders") }}
</div>


<div class="card-number">
{{ data.orders }}
</div>


</el-card>

</el-col>




<el-col :span="6">

<el-card class="stat-card">

<div class="card-title">
{{ $t("dashboard.revenue") }}
</div>


<div class="card-number">

¥{{ data.totalRevenue }}

</div>


</el-card>

</el-col>




<el-col :span="6">

<el-card class="stat-card">

<div class="card-title">
{{ $t("dashboard.onlineDevices") }}
</div>


<div
class="card-number"
:class="data.onlineDevices>0?'online':'offline'"
>

{{ data.onlineDevices }}

</div>


</el-card>

</el-col>



</el-row>





<!-- 第二层数据 -->


<el-row

:gutter="20"

class="stats-row"

>


<el-col :span="6">

<el-card class="stat-card">

<div class="card-title">

{{ $t("dashboard.devices") }}

</div>


<div class="card-number">

{{ data.devices }}

</div>


</el-card>

</el-col>




<el-col :span="6">

<el-card class="stat-card">


<div class="card-title">

{{ $t("dashboard.licenses") }}

</div>


<div class="card-number">

{{ data.licenses }}

</div>


</el-card>

</el-col>




<el-col :span="6">

<el-card class="stat-card">


<div class="card-title">

{{ $t("dashboard.firmware") }}

</div>


<div class="card-number">

{{ data.firmwares }}

</div>


</el-card>


</el-col>




<el-col :span="6">

<el-card class="stat-card">


<div class="card-title">

{{ $t("dashboard.otaDownloads") }}

</div>


<div class="card-number">

{{ data.otaDownloads }}

</div>


</el-card>

</el-col>



</el-row>
<!-- 趋势图表 -->


<el-row

:gutter="20"

class="chart-row"

>


<el-col :span="12">


<el-card class="chart-card">


<template #header>

{{ $t("dashboard.revenueTrend") }}

</template>



<div

ref="revenueChart"

class="chart"

></div>



</el-card>


</el-col>





<el-col :span="12">


<el-card class="chart-card">


<template #header>

{{ $t("dashboard.orderTrend") }}

</template>



<div

ref="orderChart"

class="chart"

></div>



</el-card>


</el-col>



</el-row>





<!-- 系统信息 -->


<el-row

:gutter="20"

class="info-row"

>



<el-col :span="12">


<el-card class="info-card">


<template #header>

{{ $t("dashboard.latestFirmware") }}

</template>



<div class="firmware-box">


<div>

版本

</div>



<strong>

{{ data.latestFirmware?.version || "-" }}

</strong>



</div>



</el-card>


</el-col>





<el-col :span="12">


<el-card class="info-card">


<template #header>

{{ $t("dashboard.systemStatus") }}

</template>




<div class="status-item">


<span>

{{ $t("dashboard.backend") }}

</span>



<el-tag type="success">

{{ $t("status.running") }}

</el-tag>



</div>





<div class="status-item">


<span>

{{ $t("dashboard.database") }}

</span>



<el-tag type="success">

{{ $t("status.connected") }}

</el-tag>



</div>






<div class="status-item">


<span>

{{ $t("dashboard.otaService") }}

</span>



<el-tag type="success">

{{ $t("status.active") }}

</el-tag>



</div>



</el-card>


</el-col>


</el-row>
<!-- 最近升级记录 -->


<el-card class="table-card">


<template #header>

{{ $t("dashboard.recentOta") }}

</template>



<el-table

:data="data.recentOtaLogs"

border

>


<el-table-column

prop="device_id"

label="设备编号"

/>



<el-table-column

prop="version"

label="系统版本"

/>




<el-table-column

prop="status"

label="状态"

>


<template #default="scope">


<el-tag

type="success"

v-if="scope.row.status==='downloaded'"

>

{{ $t("status.downloaded") }}

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

label="时间"

width="180"

/>


</el-table>



</el-card>





<!-- 最近订单 -->


<el-card

class="table-card"

>


<template #header>

{{ $t("dashboard.recentOrders") }}

</template>



<el-table

:data="data.recentOrders"

border

>



<el-table-column

prop="order_no"

label="订单编号"

width="220"

/>




<el-table-column

prop="username"

label="用户"

width="180"

/>




<el-table-column

prop="product"

label="产品"

width="150"

/>




<el-table-column

label="金额"

width="100"

>


<template #default="scope">

¥{{ scope.row.amount }}

</template>


</el-table-column>




<el-table-column

label="状态"

width="120"

>


<template #default="scope">


<el-tag

type="success"

v-if="scope.row.status==='paid'"

>

{{ $t("status.paid") }}

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

label="时间"

width="180"

/>


</el-table>



</el-card>







<!-- 最近交易 -->


<el-card

class="table-card"

>


<template #header>

{{ $t("dashboard.recentPayments") }}

</template>




<el-table

:data="data.recentPayments"

border

>




<el-table-column

prop="payment_no"

label="交易编号"

width="240"

/>





<el-table-column

prop="username"

label="用户"

width="180"

/>





<el-table-column

prop="product"

label="产品"

width="150"

/>





<el-table-column

label="金额"

width="100"

>


<template #default="scope">

¥{{ scope.row.amount }}

</template>


</el-table-column>





<el-table-column

label="状态"

width="120"

>


<template #default="scope">


<el-tag

type="success"

v-if="scope.row.status==='paid'"

>

{{ $t("status.paid") }}

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

label="时间"

/>


</el-table>



</el-card>




</div>

</template>
<script setup>

import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick
} from "vue";


import * as echarts from "echarts";


import {
  getDashboard,
  getRevenueTrend,
  getOrderTrend
} from "../api/dashboard";



const data = ref({

  users:0,

  orders:0,

  products:0,

  devices:0,

  onlineDevices:0,

  licenses:0,

  firmwares:0,

  otaDownloads:0,

  totalRevenue:0,


  recentOrders:[],

  recentPayments:[],


  latestFirmware:null,


  recentOtaLogs:[]

});




const revenueChart = ref(null);

const orderChart = ref(null);



let revenueChartInstance=null;

let orderChartInstance=null;





async function loadDashboard(){


  const res = await getDashboard();


  data.value=res.data.data;


}





async function loadRevenueChart(){


  const res = await getRevenueTrend();



  await nextTick();



  if(!revenueChart.value){

    return;

  }



  revenueChartInstance =
    echarts.init(
      revenueChart.value
    );




  revenueChartInstance.setOption({

    tooltip:{
      trigger:"axis"
    },


    xAxis:{

      type:"category",

      data:
      res.data.data.map(
        item=>item.date
      )

    },


    yAxis:{

      type:"value"

    },


    series:[{

      type:"line",

      smooth:true,

      data:
      res.data.data.map(
        item=>item.amount
      )

    }]


  });


}







async function loadOrderChart(){


 const res = await getOrderTrend();



 await nextTick();



 if(!orderChart.value){

    return;

 }



 orderChartInstance =
 echarts.init(
    orderChart.value
 );



 orderChartInstance.setOption({


 tooltip:{
    trigger:"axis"
 },


 xAxis:{

    type:"category",

    data:
    res.data.data.map(
      item=>item.date
    )

 },


 yAxis:{

    type:"value"

 },


 series:[{


    type:"bar",


    data:
    res.data.data.map(
      item=>item.count
    )


 }]


 });


}






function resizeCharts(){


 if(revenueChartInstance){

    revenueChartInstance.resize();

 }


 if(orderChartInstance){

    orderChartInstance.resize();

 }


}






onMounted(async()=>{


 await loadDashboard();


 await loadRevenueChart();


 await loadOrderChart();



 window.addEventListener(
    "resize",
    resizeCharts
 );


});






onBeforeUnmount(()=>{


 window.removeEventListener(
    "resize",
    resizeCharts
 );


 if(revenueChartInstance){

    revenueChartInstance.dispose();

 }


 if(orderChartInstance){

    orderChartInstance.dispose();

 }


});



</script>
<style scoped>


.dashboard{


width:100%;


box-sizing:border-box;


}



.stats-row{


margin-bottom:20px;


}



/* 数据卡片 */


.stat-card{


height:150px;


border-radius:12px;


transition:all .2s ease;


}



.stat-card:hover{


transform:translateY(-2px);


box-shadow:
0 8px 20px rgba(0,0,0,.08);


}



.card-title{


font-size:14px;


color:#64748B;


}



.card-number{


margin-top:16px;


font-size:32px;


font-weight:700;


color:#111827;


}



.online{


color:#16A34A;


}



.offline{


color:#94A3B8;


}





/* 图表 */


.chart-row{


margin-top:20px;


}



.chart-card{

height:330px;

overflow:hidden;

}


.chart{

width:100%;

height:240px;

}





/* 信息卡 */


.info-row{


margin-top:20px;


}



.info-card{


height:220px;


border-radius:12px;


}




.firmware-box{


display:flex;


flex-direction:column;


gap:16px;


font-size:16px;


color:#475569;


}



.firmware-box strong{


font-size:32px;


color:#111827;


}





.status-item{


display:flex;


justify-content:space-between;


align-items:center;


padding:12px 0;


border-bottom:1px solid #E5E7EB;


}



.status-item:last-child{


border-bottom:none;


}





/* 表格卡片 */


.table-card{


margin-top:20px;


border-radius:12px;


}



:deep(.el-card__header){


font-weight:600;


font-size:16px;


}




:deep(.el-table){


width:100%;


}




:deep(.el-table th){


background:#F8FAFC;


font-weight:600;


}



:deep(.el-table tbody tr:hover > td){


background:#EFF6FF;


}






/* 标签 */


:deep(.el-tag){


border-radius:6px;


}




</style>
