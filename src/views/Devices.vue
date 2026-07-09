<template>
  <div>

    <div class="page-header">
      <h2>Device Management</h2>
    </div>


    <el-table
      :data="devices"
      border
      style="width:100%;margin-top:20px;"
    >

      <el-table-column
        prop="id"
        label="ID"
        width="70"
      />


      <el-table-column
        prop="device_id"
        label="Device ID"
        width="180"
      />


      <el-table-column
        prop="model"
        label="Model"
        width="140"
      />


      <el-table-column
        prop="firmware_version"
        label="Firmware"
        width="120"
      />


      <el-table-column
        label="License"
        width="220"
      >

        <template #default="scope">

          {{ scope.row.license_key || "None" }}

        </template>

      </el-table-column>


      <el-table-column
        label="Status"
        width="120"
      >

        <template #default="scope">

          <el-tag
            v-if="scope.row.status === 'online'"
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

        </template>

      </el-table-column>


      <el-table-column
        prop="last_seen"
        label="Last Heartbeat"
        width="180"
      />


      <el-table-column
        label="Action"
        width="120"
      >

        <template #default="scope">

          <el-button
            type="primary"
            size="small"
            @click="viewDevice(scope.row.device_id)"
          >
            View
          </el-button>

        </template>

      </el-table-column>


    </el-table>


  </div>
</template>



<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { getDevices } from "../api/device";


const router = useRouter();


const devices = ref([]);



async function loadDevices(){

    try {

        const res = await getDevices();

        devices.value = res.data.data;


    } catch(err){

        console.error(err);

    }

}



function viewDevice(deviceId){

    router.push(
        `/devices/${deviceId}`
    );

}



onMounted(() => {

    loadDevices();

});

</script>



<style scoped>

.page-header{

    display:flex;
    justify-content:space-between;
    align-items:center;

}

</style>
