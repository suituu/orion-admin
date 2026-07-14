<template>
  <div>

    <div class="page-header">
      <h2>Order Management</h2>
    </div>


    <el-table
      :data="orders"
      border
      style="width:100%;margin-top:20px;"
    >

      <el-table-column
        prop="id"
        label="ID"
        width="70"
      />


      <el-table-column
        prop="order_no"
        label="Order No"
        width="220"
      />


      <el-table-column
        prop="username"
        label="User"
        width="150"
      />


      <el-table-column
        prop="product"
        label="Product"
        width="150"
      />


      <el-table-column
        prop="amount"
        label="Amount"
        width="100"
      />


      <el-table-column
        label="Status"
        width="120"
      >

        <template #default="scope">

          <el-tag
            v-if="scope.row.status === 'created'"
            type="warning"
          >
            Created
          </el-tag>


          <el-tag
            v-else-if="scope.row.status === 'paid'"
            type="success"
          >
            Paid
          </el-tag>


          <el-tag
            v-else
            type="info"
          >
            {{ scope.row.status }}
          </el-tag>


        </template>

      </el-table-column>


      <el-table-column
        prop="created_at"
        label="Created At"
        width="180"
      />


      <el-table-column
        label="Action"
        width="140"
      >

<template #default="scope">

  <el-button
    type="primary"
    size="small"
    @click="viewOrder(scope.row.id)"
  >
    View
  </el-button>

  <el-button
    v-if="scope.row.status === 'created'"
    type="success"
    size="small"
    @click="handlePay(scope.row.id)"
  >
    Mark Paid
  </el-button>

</template>

      </el-table-column>


    </el-table>


  </div>
</template>



<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  getOrders,
  payOrder
} from "../api/order";



const orders = ref([]);
const router = useRouter();

function viewOrder(id) {

  router.push(
    `/orders/${id}`
  );

}

async function loadOrders(){

  try{

    const res = await getOrders();

    orders.value = res.data.data;


  }catch(err){

    console.error(err);

  }

}




async function handlePay(id){

  if(!confirm("Confirm payment for this order?")){

    return;

  }


  try{

    const res = await payOrder(id);


    alert(
      "Payment success\nLicense: "
      + res.data.data.license_key
    );


    await loadOrders();


  }catch(err){

    console.error(err);

    alert("Payment failed");

  }

}




onMounted(()=>{

  loadOrders();

});


</script>



<style scoped>

.page-header{

  display:flex;
  justify-content:space-between;
  align-items:center;

}

</style>
