<template>
  <div class="page">

    <h2>Order Detail</h2>

    <el-card v-if="order">

      <el-descriptions
        title="Order Information"
        border
        :column="2"
      >

        <el-descriptions-item label="ID">
          {{ order.id }}
        </el-descriptions-item>

        <el-descriptions-item label="Order No">
          {{ order.order_no }}
        </el-descriptions-item>

        <el-descriptions-item label="User">
          {{ order.username || "-" }}
        </el-descriptions-item>

        <el-descriptions-item label="Email">
          {{ order.email || "-" }}
        </el-descriptions-item>

        <el-descriptions-item label="Product">
          {{ order.product || "-" }}
        </el-descriptions-item>

        <el-descriptions-item label="Amount">
          ¥{{ order.amount }}
        </el-descriptions-item>

        <el-descriptions-item label="Status">
          <el-tag
            v-if="order.status === 'paid'"
            type="success"
          >
            Paid
          </el-tag>

          <el-tag
            v-else
            type="warning"
          >
            {{ order.status }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="Created At">
          {{ order.created_at }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

    <el-card
      v-if="order"
      style="margin-top:20px;"
    >

      <template #header>
        License Information
      </template>

      <el-descriptions
        border
        :column="2"
      >

        <el-descriptions-item label="License Key">
          {{ order.license_key || "None" }}
        </el-descriptions-item>

        <el-descriptions-item label="License Status">
          <el-tag
            v-if="order.license_status === 'active'"
            type="success"
          >
            Active
          </el-tag>

          <el-tag
            v-else-if="order.license_status === 'revoked'"
            type="danger"
          >
            Revoked
          </el-tag>

          <el-tag
            v-else
            type="info"
          >
            {{ order.license_status || "None" }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="Device">
          {{ order.device_id || "Not Bound" }}
        </el-descriptions-item>

        <el-descriptions-item label="Activated At">
          {{ order.activated_at || "-" }}
        </el-descriptions-item>

        <el-descriptions-item label="Expires At">
          {{ order.expires_at || "Unlimited" }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getOrder } from "../api/order";

const route = useRoute();
const order = ref(null);

async function loadOrder() {
  try {
    const res = await getOrder(route.params.id);
    order.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  loadOrder();
});
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
