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
    min-width="180"
/>

<el-table-column
    prop="firmware_version"
    label="Version"
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
    label="Status"
    width="140"
>
    <template #default="scope">

        <el-tag
            type="success"
            v-if="scope.row.status === 'downloaded'"
        >
            Downloaded
        </el-tag>

        <el-tag
            type="info"
            v-else
        >
            {{ scope.row.status }}
        </el-tag>

    </template>
</el-table-column>

<el-table-column
    prop="ip_address"
    label="IP"
    width="150"
/>

<el-table-column
    prop="created_at"
    label="Time"
    min-width="180"
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
