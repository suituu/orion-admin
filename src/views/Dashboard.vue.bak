<template>
  <div class="page">

    <h1>ORION Dashboard</h1>


    <!-- Statistics -->
    <el-row
      :gutter="20"
      style="margin-top:30px;"
    >

      <el-col :span="6">
        <el-card>
          <h3>Users</h3>
          <div class="number">
            {{ dashboard.users }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>Devices</h3>
          <div class="number">
            {{ dashboard.devices }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>Online Devices</h3>
          <div class="number">
            {{ dashboard.onlineDevices }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>Licenses</h3>
          <div class="number">
            {{ dashboard.licenses }}
          </div>
        </el-card>
      </el-col>

    </el-row>



    <el-row
      :gutter="20"
      style="margin-top:20px;"
    >

      <el-col :span="6">
        <el-card>
          <h3>Products</h3>
          <div class="number">
            {{ dashboard.products }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>Firmwares</h3>
          <div class="number">
            {{ dashboard.firmwares }}
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>Latest Firmware</h3>

          <div class="number small">
            {{
              dashboard.latestFirmware?.version || "-"
            }}
          </div>

        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <h3>OTA Downloads</h3>

          <div class="number">
            {{ dashboard.otaDownloads }}
          </div>

        </el-card>
      </el-col>

    </el-row>



    <!-- OTA Activity -->

    <el-card
      style="margin-top:30px;"
    >

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
          prop="status"
          label="Status"
          width="140"
        >

          <template #default="scope">

            <el-tag
              type="success"
            >
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
  onMounted
} from "vue";


import {
  getDashboard
} from "../api/dashboard";



const dashboard = ref({

  users:0,

  orders:0,

  products:0,

  admins:0,

  devices:0,

  onlineDevices:0,

  licenses:0,

  firmwares:0,

  otaDownloads:0,

  latestFirmware:null,

  recentOtaLogs:[]

});



async function loadDashboard(){

  try{

    const res = await getDashboard();

    dashboard.value = res.data.data;


  }catch(err){

    console.error(err);

  }

}



onMounted(()=>{

  loadDashboard();

});


</script>



<style scoped>

.page{

  padding:20px;

}


.number{

  font-size:32px;

  font-weight:bold;

  margin-top:15px;

}


.small{

  font-size:26px;

}


</style>
