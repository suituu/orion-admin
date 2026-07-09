<template>
  <div>

    <div class="page-header">
      <h2>Product Management</h2>
    </div>


    <el-table
      :data="products"
      border
      style="width:100%;margin-top:20px;"
    >

      <el-table-column
        prop="id"
        label="ID"
        width="80"
      />


      <el-table-column
        prop="name"
        label="Product Name"
        width="220"
      />


      <el-table-column
        prop="price"
        label="Price"
        width="120"
      >

        <template #default="scope">

          ¥{{ scope.row.price }}

        </template>

      </el-table-column>


      <el-table-column
        prop="description"
        label="Description"
      />


    </el-table>


  </div>
</template>



<script setup>

import { ref, onMounted } from "vue";

import {
  getProducts
} from "../api/product";


const products = ref([]);



async function loadProducts(){

  try{

    const res = await getProducts();

    products.value = res.data;


  }catch(err){

    console.error(err);

  }

}



onMounted(()=>{

  loadProducts();

});

</script>



<style scoped>

.page-header{

  display:flex;
  justify-content:space-between;
  align-items:center;

}

</style>
