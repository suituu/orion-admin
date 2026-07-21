<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>ORION Admin</h2>

      <el-form @submit.prevent="login">
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="Username"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="Password"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          style="width:100%;"
          @click="login"
        >
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { adminLogin } from "../api/admin";

const username = ref("");
const password = ref("");
const router = useRouter();
async function login() {
    try {
        const res = await adminLogin(
            username.value,
            password.value
        );

        console.log(res.data);

localStorage.setItem(
    "token",
    res.data.token
);

router.push("/");

    } catch (err) {

        console.error(err);

        alert("Login failed");
    }
}
</script>

<style scoped>
.login-container{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#f5f7fa;
}

.login-card{
    width:380px;
}
</style>
