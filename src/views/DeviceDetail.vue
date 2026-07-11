<template>
  <div class="page">

    <h2>Device Detail</h2>


    <el-card v-if="device">

      <template #header>
        Device Information
      </template>


      <el-descriptions
        border
        :column="2"
      >

        <el-descriptions-item label="ID">
          {{ device.id }}
        </el-descriptions-item>


        <el-descriptions-item label="Device ID">
          {{ device.device_id }}
        </el-descriptions-item>


        <el-descriptions-item label="Model">
          {{ device.model }}
        </el-descriptions-item>


        <el-descriptions-item label="Hardware Version">
          {{ device.hardware_version || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="Serial Number">
          {{ device.serial_number || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="MAC Address">
          {{ device.mac_address || "-" }}
        </el-descriptions-item>


      </el-descriptions>

    </el-card>



    <el-card
      v-if="device"
      style="margin-top:20px;"
    >

      <template #header>
        System Status
      </template>


      <el-descriptions
        border
        :column="2"
      >

        <el-descriptions-item label="Firmware">
          {{ device.firmware_version }}
        </el-descriptions-item>


        <el-descriptions-item label="Status">

          <el-tag
            v-if="device.status === 'online'"
            type="success"
          >
            Online
          </el-tag>


          <el-tag
            v-else
            type="info"
          >
            Offline
          </el-tag>

        </el-descriptions-item>


        <el-descriptions-item label="Last Heartbeat">
          {{ device.last_seen }}
        </el-descriptions-item>


        <el-descriptions-item label="Created">
          {{ device.created_at }}
        </el-descriptions-item>


      </el-descriptions>


    </el-card>



    <el-card
      v-if="device"
      style="margin-top:20px;"
    >

      <template #header>
        License Information
      </template>


      <el-descriptions
        border
        :column="2"
      >

        <el-descriptions-item label="License Key">
          {{ device.license_key || "None" }}
        </el-descriptions-item>


        <el-descriptions-item label="License Status">

          <el-tag
            v-if="device.license_key"
            type="success"
          >
            Active
          </el-tag>


          <el-tag
            v-else
            type="info"
          >
            None
          </el-tag>

        </el-descriptions-item>


      </el-descriptions>


    </el-card>



    <el-card
      style="margin-top:20px;"
    >

      <template #header>
        OTA History
      </template>

<el-table
  :data="otaLogs"
  border
>

<el-table-column
  prop="from_version"
  label="From"
  width="100"
/>


<el-table-column
  prop="to_version"
  label="To"
  width="100"
/>


<el-table-column
  prop="version"
  label="Firmware"
  width="120"
/>


<el-table-column
  label="Status"
  width="150"
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


    device.value = res.data.data;


  }catch(err){

    console.error(err);

  }

}

async function loadOtaLogs(){

  try{

    const res = await getDeviceOtaLogs(
      route.params.deviceId
    );

    otaLogs.value = res.data.data;


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

</style>
