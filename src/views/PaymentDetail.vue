<template>
  <div>

    <div class="page-header">
      <h2>Payment Detail</h2>
    </div>


    <el-card
      style="margin-top:20px;"
    >

      <h3>Payment Information</h3>


      <el-descriptions
        :column="2"
        border
      >

        <el-descriptions-item label="Payment No">
          {{ payment.payment_no }}
        </el-descriptions-item>


        <el-descriptions-item label="Order No">
          {{ payment.order_no }}
        </el-descriptions-item>


        <el-descriptions-item label="User">
          {{ payment.username || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="Email">
          {{ payment.email || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="Product">
          {{ payment.product }}
        </el-descriptions-item>


        <el-descriptions-item label="Provider">
          {{ payment.provider }}
        </el-descriptions-item>


        <el-descriptions-item label="Amount">
          ¥{{ payment.amount }}
        </el-descriptions-item>


        <el-descriptions-item label="Currency">
          {{ payment.currency }}
        </el-descriptions-item>


        <el-descriptions-item label="Status">

          <el-tag
            v-if="payment.status === 'paid'"
            type="success"
          >
            Paid
          </el-tag>


          <el-tag
            v-else
            type="warning"
          >
            {{ payment.status }}
          </el-tag>

        </el-descriptions-item>


        <el-descriptions-item label="Transaction ID">
          {{ payment.transaction_id || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="Paid At">
          {{ payment.paid_at || "-" }}
        </el-descriptions-item>


        <el-descriptions-item label="Created At">
          {{ payment.created_at }}
        </el-descriptions-item>


        <el-descriptions-item label="Failure Reason">
          {{ payment.failure_reason || "-" }}
        </el-descriptions-item>


      </el-descriptions>


    </el-card>


  </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import {
  getPayment
} from "../api/payment";


const route = useRoute();


const payment = ref({});



async function loadPayment(){

  try{

    const res = await getPayment(
      route.params.id
    );

    payment.value = res.data.data;


  }catch(err){

    console.error(err);

  }

}



onMounted(()=>{

  loadPayment();

});


</script>


<style scoped>

.page-header{

  display:flex;
  justify-content:space-between;
  align-items:center;

}

</style>
