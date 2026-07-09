<template>
  <el-container style="height:100vh">

    <el-aside width="220px">

      <h2 style="padding:20px;">
        ORION
      </h2>

      <el-menu
        router
        default-active="/"
      >

        <el-menu-item index="/">
          Dashboard
        </el-menu-item>

        <el-menu-item index="/devices">
          Devices
        </el-menu-item>

        <el-menu-item index="/licenses">
          Licenses
        </el-menu-item>

        <el-menu-item index="/firmwares">
          Firmwares
        </el-menu-item>

        <el-menu-item index="/orders">
          Orders
        </el-menu-item>

      </el-menu>

    </el-aside>

    <el-container>

     <el-header class="header">

  <h3>ORION Admin Dashboard</h3>

  <el-button
      type="danger"
      @click="logout">

      Logout

  </el-button>

</el-header>

      <el-main>

        <router-view />

      </el-main>

    </el-container>

  </el-container>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {

    localStorage.removeItem("token");

    router.push("/login");

}
</script>
<style scoped>

.header{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

</style>
