<template>
  <div>

    <div class="page-header">
      <h2>License Management</h2>
    </div>


    <el-table
      :data="licenses"
      border
      style="width:100%;margin-top:20px;"
    >

      <el-table-column
        prop="id"
        label="ID"
        width="70"
      />


      <el-table-column
        prop="license_key"
        label="License Key"
        width="230"
      />


      <el-table-column
        prop="username"
        label="User"
        width="150"
      />


      <el-table-column
        prop="order_no"
        label="Order No"
        width="220"
      />


      <el-table-column
        prop="product"
        label="Product"
        width="160"
      />


      <el-table-column
        prop="device_id"
        label="Device ID"
        width="200"
      />


      <el-table-column
        label="Status"
        width="120"
      >

        <template #default="scope">

          <el-tag
            v-if="scope.row.status === 'active'"
            type="success"
          >
            Active
          </el-tag>


          <el-tag
            v-else-if="scope.row.status === 'revoked'"
            type="danger"
          >
            Revoked
          </el-tag>


          <el-tag
            v-else
            type="info"
          >
            Unused
          </el-tag>

        </template>

      </el-table-column>


      <el-table-column
        prop="activated_count"
        label="Activated"
        width="100"
      />


      <el-table-column
        prop="activated_at"
        label="Activated At"
        width="180"
      />


      <el-table-column
        prop="created_at"
        label="Created At"
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
      @click="viewLicense(scope.row.license_key)"
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
import { getLicenses } from "../api/license";


const licenses = ref([]);
const router = useRouter();

function viewLicense(key){

    router.push(
        `/licenses/${key}`
    );

}
async function loadLicenses(){

    try {

        const res = await getLicenses();

        licenses.value = res.data.data;


    } catch(err){

        console.error(err);

    }

}



onMounted(() => {

    loadLicenses();

});

</script>



<style scoped>

.page-header{

    display:flex;
    justify-content:space-between;
    align-items:center;

}

</style>
