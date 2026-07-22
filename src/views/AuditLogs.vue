<template>

<div>

    <div class="page-header">
        <h2>
            Audit Logs
        </h2>
    </div>


    <el-table
        :data="logs"
        border
        style="width:100%;margin-top:20px;"
    >

        <el-table-column
            prop="username"
            label="User"
            width="120"
        />

        <el-table-column
            prop="action"
            label="Action"
            width="120"
        />

        <el-table-column
            prop="module"
            label="Module"
            width="120"
        />

        <el-table-column
            prop="target_id"
            label="Target"
            width="120"
        />

        <el-table-column
            prop="description"
            label="Description"
            min-width="200"
        />

        <el-table-column
            prop="ip"
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
    getAuditLogs
} from "../api/audit";


const logs = ref([]);



async function loadLogs(){

    try {

        const res = await getAuditLogs({
            page:1,
            limit:20
        });


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
