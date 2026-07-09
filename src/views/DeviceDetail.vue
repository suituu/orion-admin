<template>
  <div>

    <h2>Device Detail</h2>

    <el-card v-if="device">

      <el-descriptions
        title="Device Information"
        border
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

        <el-descriptions-item label="Firmware">
          {{ device.firmware_version }}
        </el-descriptions-item>

        <el-descriptions-item label="License">
          {{ device.license_key || "None" }}
        </el-descriptions-item>

        <el-descriptions-item label="Status">
          {{ device.status }}
        </el-descriptions-item>

        <el-descriptions-item label="Last Heartbeat">
          {{ device.last_seen }}
        </el-descriptions-item>

        <el-descriptions-item label="Created">
          {{ device.created_at }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>


  </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getDevice } from "../api/device";


const route = useRoute();

const device = ref(null);


async function loadDevice(){

    try {

        const res = await getDevice(
            route.params.deviceId
        );

        device.value = res.data.data;

    } catch(err){

        console.error(err);

    }

}


onMounted(() => {

    loadDevice();

});


</script>
