<template>
  <div class="page">

    <h1>ORION Dashboard</h1>


    <!-- Business Statistics -->
    <el-row :gutter="20" class="statistics-row">

      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Users</h3>
          <div class="number">
            {{ dashboard.users }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Orders</h3>
          <div class="number">
            {{ dashboard.orders }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Products</h3>
          <div class="number">
            {{ dashboard.products }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Licenses</h3>
          <div class="number">
            {{ dashboard.licenses }}
          </div>
        </el-card>
      </el-col>

    </el-row>



    <!-- Device Statistics -->
    <el-row :gutter="20" class="statistics-row">

      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Devices</h3>
          <div class="number">
            {{ dashboard.devices }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Online Devices</h3>
          <div class="number">
            {{ dashboard.onlineDevices }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Firmwares</h3>
          <div class="number">
            {{ dashboard.firmwares }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Latest Firmware</h3>
          <div class="number small">
            {{ dashboard.latestFirmware?.version || "-" }}
          </div>
        </el-card>
      </el-col>

    </el-row>




    <!-- Payment Statistics -->
    <el-row :gutter="20" class="statistics-row">

      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Payments</h3>
          <div class="number">
            {{ dashboard.payments }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Paid Payments</h3>
          <div class="number">
            {{ dashboard.paidPayments }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Pending Payments</h3>
          <div class="number">
            {{ dashboard.pendingPayments }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="stat-card">
          <h3>Total Revenue</h3>
          <div class="number revenue">
            ¥{{ formatAmount(dashboard.totalRevenue) }}
          </div>
        </el-card>
      </el-col>

    </el-row>




    <!-- OTA Statistics -->
    <el-row :gutter="20" class="statistics-row">

      <el-col :span="6">
        <el-card class="stat-card">
          <h3>OTA Downloads</h3>
          <div class="number">
            {{ dashboard.otaDownloads }}
          </div>
        </el-card>
      </el-col>

    </el-row>



    <!-- Revenue Trend -->
    <el-card class="activity-card">

      <template #header>
        Revenue Trend
      </template>


      <div
        ref="revenueChart"
        style="height:350px;width:100%;"
      ></div>


    </el-card>




    <!-- Order Trend -->
    <el-card class="activity-card">

      <template #header>
        Order Trend
      </template>


      <div
        ref="orderChart"
        style="height:350px;width:100%;"
      ></div>


    </el-card>
    <!-- Recent Orders -->
    <el-card class="activity-card">

      <template #header>
        Recent Orders
      </template>


      <el-table
        :data="dashboard.recentOrders"
        border
        style="width:100%;"
      >

        <el-table-column
          prop="order_no"
          label="Order No."
          min-width="200"
        />


        <el-table-column
          prop="username"
          label="User"
          min-width="140"
        >
          <template #default="scope">
            {{ scope.row.username || "-" }}
          </template>
        </el-table-column>


        <el-table-column
          prop="product"
          label="Product"
          min-width="140"
        />


        <el-table-column
          label="Amount"
          width="120"
        >
          <template #default="scope">
            ¥{{ formatAmount(scope.row.amount) }}
          </template>
        </el-table-column>


        <el-table-column
          label="Status"
          width="120"
        >
          <template #default="scope">

            <el-tag
              :type="scope.row.status === 'paid' ? 'success' : 'warning'"
            >
              {{ scope.row.status }}
            </el-tag>

          </template>
        </el-table-column>


        <el-table-column
          prop="created_at"
          label="Created At"
          min-width="180"
        />

      </el-table>

    </el-card>




    <!-- Recent Payments -->
    <el-card class="activity-card">

      <template #header>
        Recent Payments
      </template>


      <el-table
        :data="dashboard.recentPayments"
        border
        style="width:100%;"
      >

        <el-table-column
          prop="payment_no"
          label="Payment No."
          min-width="220"
        />


        <el-table-column
          prop="order_no"
          label="Order No."
          min-width="180"
        />


        <el-table-column
          prop="username"
          label="User"
          min-width="140"
        >

          <template #default="scope">
            {{ scope.row.username || "-" }}
          </template>

        </el-table-column>


        <el-table-column
          prop="product"
          label="Product"
          min-width="140"
        />


        <el-table-column
          label="Amount"
          width="120"
        >

          <template #default="scope">
            ¥{{ formatAmount(scope.row.amount) }}
          </template>

        </el-table-column>


        <el-table-column
          prop="provider"
          label="Provider"
          width="110"
        />


        <el-table-column
          label="Status"
          width="120"
        >

          <template #default="scope">

            <el-tag
              :type="scope.row.status === 'paid' ? 'success' : 'warning'"
            >
              {{ scope.row.status }}
            </el-tag>

          </template>

        </el-table-column>


        <el-table-column
          prop="created_at"
          label="Created At"
          min-width="180"
        />

      </el-table>


    </el-card>
    <!-- Recent OTA Activity -->
    <el-card class="activity-card">

      <template #header>
        Recent OTA Activity
      </template>


      <el-table
        :data="dashboard.recentOtaLogs"
        border
        style="width:100%;"
      >

        <el-table-column
          prop="device_id"
          label="Device"
          min-width="200"
        />


        <el-table-column
          prop="version"
          label="Version"
          width="120"
        />


        <el-table-column
          label="Status"
          width="140"
        >

          <template #default="scope">

            <el-tag type="success">
              {{ scope.row.status }}
            </el-tag>

          </template>

        </el-table-column>


        <el-table-column
          prop="created_at"
          label="Time"
          min-width="180"
        />

      </el-table>


    </el-card>


  </div>

</template>


<script setup>

import {
  ref,
  onMounted,
  nextTick
} from "vue";


import * as echarts from "echarts";


import {
  getDashboard,
  getRevenueTrend,
  getOrderTrend
} from "../api/dashboard";



const revenueChart = ref(null);

const revenueData = ref([]);


const orderChart = ref(null);

const orderData = ref([]);



const dashboard = ref({

  users: 0,
  orders: 0,
  products: 0,
  admins: 0,

  devices: 0,
  onlineDevices: 0,

  licenses: 0,
  firmwares: 0,

  payments: 0,
  paidPayments: 0,
  pendingPayments: 0,
  totalRevenue: 0,

  otaDownloads: 0,

  latestFirmware: null,

  recentOrders: [],

  recentPayments: [],

  recentOtaLogs: [],

});



function formatAmount(value) {

  const amount = Number(value);


  if (!Number.isFinite(amount)) {

    return "0.00";

  }


  return amount.toFixed(2);

}




async function loadDashboard() {

  try {

    const res = await getDashboard();


    dashboard.value = {

      ...dashboard.value,

      ...res.data.data,

    };


  } catch(err) {

    console.error(err);

  }

}






async function loadRevenueChart() {

  try {


    const res = await getRevenueTrend();


    revenueData.value = res.data.data;


    await nextTick();


    const chart =
      echarts.init(revenueChart.value);



    chart.setOption({

      title: {
        text: "Revenue Trend"
      },


      tooltip: {},


      xAxis: {

        type: "category",

        data: revenueData.value.map(
          item => item.date
        )

      },


      yAxis: {

        type: "value"

      },


      series: [

        {

          name: "Revenue",

          type: "line",

          data: revenueData.value.map(
            item => item.amount
          )

        }

      ]

    });


  } catch(err) {

    console.error(err);

  }

}






async function loadOrderChart() {

  try {


    const res = await getOrderTrend();


    orderData.value = res.data.data;


    await nextTick();


    const chart =
      echarts.init(orderChart.value);



    chart.setOption({

      title: {

        text: "Order Trend"

      },


      tooltip: {},


      xAxis: {

        type: "category",

        data: orderData.value.map(
          item => item.date
        )

      },


      yAxis: {

        type: "value"

      },


      series: [

        {

          name: "Orders",

          type: "line",

          data: orderData.value.map(
            item => item.count
          )

        }

      ]

    });


  } catch(err) {

    console.error(err);

  }

}





onMounted(()=>{


  loadDashboard();


  loadRevenueChart();


  loadOrderChart();


});



</script>


<style scoped>

.page {

  padding: 20px;

}



.statistics-row {

  margin-top: 20px;

}



.statistics-row:first-of-type {

  margin-top: 30px;

}



.stat-card {

  min-height: 125px;

}



.stat-card h3 {

  min-height: 26px;

  margin: 0;

}



.number {

  margin-top: 15px;

  font-size: 32px;

  font-weight: bold;

}



.small {

  font-size: 26px;

}



.revenue {

  font-size: 28px;

}



.activity-card {

  margin-top: 30px;

}

</style>
