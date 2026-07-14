<template>
  <div class="page">

    <h2>Firmware Detail</h2>

    <el-card v-if="firmware">

      <el-descriptions
        title="Firmware Information"
        border
        :column="2"
      >

        <el-descriptions-item label="ID">
          {{ firmware.id }}
        </el-descriptions-item>

        <el-descriptions-item label="Version">
          {{ firmware.version }}
        </el-descriptions-item>

        <el-descriptions-item label="Product">
          {{ firmware.product_name || "-" }}
        </el-descriptions-item>

        <el-descriptions-item label="Channel">
          {{ firmware.channel }}
        </el-descriptions-item>

        <el-descriptions-item label="Hardware Version">
          {{ firmware.hardware_version }}
        </el-descriptions-item>

        <el-descriptions-item label="Minimum Version">
          {{ firmware.min_version }}
        </el-descriptions-item>

        <el-descriptions-item label="File Name">
          {{ firmware.file_name }}
        </el-descriptions-item>

        <el-descriptions-item label="File Size">
          {{ firmware.file_size }} bytes
        </el-descriptions-item>

        <el-descriptions-item label="Force Update">
          {{ Number(firmware.force_update) === 1 ? "Yes" : "No" }}
        </el-descriptions-item>

        <el-descriptions-item label="Published At">
          {{ firmware.published_at }}
        </el-descriptions-item>

        <el-descriptions-item label="Checksum" :span="2">
          {{ firmware.checksum }}
        </el-descriptions-item>

        <el-descriptions-item label="Download URL" :span="2">
          {{ firmware.download_url }}
        </el-descriptions-item>

        <el-descriptions-item label="Release Notes" :span="2">
          {{ firmware.release_notes || "-" }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFirmware } from "../api/firmware";

const route = useRoute();
const firmware = ref(null);

async function loadFirmware() {
  try {
    const res = await getFirmware(route.params.id);
    firmware.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  loadFirmware();
});
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
