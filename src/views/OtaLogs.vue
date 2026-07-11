<template>

<div>

    <div class="page-header">

        <h2>
            OTA Logs
        </h2>

    </div>


    <el-table
        :data="logs"
        border
        style="width:100%;margin-top:20px;"
    >

        <el-table-column
            prop="device_id"
            label="Device"
        />


        <el-table-column
            prop="firmware_id"
            label="Firmware ID"
            width="120"
        />


        <el-table-column
            prop="from_version"
            label="From"
        />


        <el-table-column
            prop="to_version"
            label="To"
        />


        <el-table-column
            prop="status"
            label="Status"
        />


        <el-table-column
            prop="ip_address"
            label="IP"
        />


        <el-table-column
            prop="created_at"
            label="Time"
        />

    </el-table>

</div>

</template>


<script setup>

import {
    ref,
    onMounted
} from "vue";


import {
    getOtaLogs
} from "../api/otaLogs";


const logs = ref([]);



async function loadLogs(){

    try {

        const res = await getOtaLogs();

        logs.value =
            res.data.data;


    } catch(err){

        console.error(err);

    }

}



onMounted(()=>{

    loadLogs();

});


</script>


<style scoped>

.page-header {

    display:flex;

    justify-content:space-between;

    align-items:center;

}

</style>
