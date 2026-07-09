<template>
  <div class="page">

    <h1>ORION Dashboard</h1>


    <el-row
      :gutter="20"
      style="margin-top:30px;"
    >

      <el-col
        :span="6"
      >
        <el-card>
          <h3>Users</h3>
          <div class="number">
            {{ dashboard.users }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Orders</h3>
          <div class="number">
            {{ dashboard.orders }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Products</h3>
          <div class="number">
            {{ dashboard.products }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Admins</h3>
          <div class="number">
            {{ dashboard.admins }}
          </div>
        </el-card>
      </el-col>


    </el-row>



    <el-row
      :gutter="20"
      style="margin-top:20px;"
    >


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Devices</h3>
          <div class="number">
            {{ dashboard.devices }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Online Devices</h3>
          <div class="number">
            {{ dashboard.onlineDevices }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Licenses</h3>
          <div class="number">
            {{ dashboard.licenses }}
          </div>
        </el-card>
      </el-col>


      <el-col
        :span="6"
      >
        <el-card>
          <h3>Firmwares</h3>
          <div class="number">
            {{ dashboard.firmwares }}
          </div>
        </el-card>
      </el-col>


    </el-row>


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

  firmwares:0

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

</style>
