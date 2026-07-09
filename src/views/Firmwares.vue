<template>
  <div>
    <div class="page-header">
      <h2>Firmware Management</h2>

      <el-button type="primary" @click="uploadDialogVisible = true">
        Upload Firmware
      </el-button>
    </div>

    <el-table :data="firmwares" border style="width:100%;margin-top:20px;">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="version" label="Version" />
      <el-table-column prop="file_name" label="File Name" />
      <el-table-column prop="file_size" label="Size" />
      <el-table-column prop="published_at" label="Published At" />

      <el-table-column label="Action" width="140">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="uploadDialogVisible" title="Upload Firmware" width="500px">
      <el-form label-width="120px">
        <el-form-item label="Version">
          <el-input v-model="uploadForm.version" placeholder="1.0.3" />
        </el-form-item>

        <el-form-item label="Force Update">
          <el-switch v-model="uploadForm.force_update" />
        </el-form-item>

        <el-form-item label="Release Notes">
          <el-input
            v-model="uploadForm.release_notes"
            type="textarea"
            placeholder="Update notes"
          />
        </el-form-item>

        <el-form-item label="Firmware File">
          <input type="file" accept=".bin" @change="handleFileChange" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="uploadDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleUpload">Upload</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getFirmwares,
  deleteFirmware,
  uploadFirmware,
} from "../api/firmware";

const firmwares = ref([]);
const uploadDialogVisible = ref(false);

const uploadForm = ref({
  version: "",
  force_update: false,
  release_notes: "",
  file: null,
});

async function loadFirmwares() {
  try {
    const res = await getFirmwares();
    firmwares.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
}

function handleFileChange(event) {
  uploadForm.value.file = event.target.files[0];
}

async function handleUpload() {
  console.log("uploadForm", uploadForm.value);
    if (!uploadForm.value.version) {
    alert("Version is required");
    return;
  }

  if (!uploadForm.value.file) {
    alert("Firmware file is required");
    return;
  }

  const formData = new FormData();
  formData.append("version", uploadForm.value.version);
  formData.append("force_update", uploadForm.value.force_update ? 1 : 0);
  formData.append("release_notes", uploadForm.value.release_notes);
  formData.append("firmware", uploadForm.value.file);

  try {
    await uploadFirmware(formData);

    uploadDialogVisible.value = false;

    uploadForm.value = {
      version: "",
      force_update: false,
      release_notes: "",
      file: null,
    };

    await loadFirmwares();
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
}

async function handleDelete(id) {
  if (!confirm("Delete this firmware?")) {
    return;
  }

  try {
    await deleteFirmware(id);
    await loadFirmwares();
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
}

onMounted(() => {
  loadFirmwares();
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
