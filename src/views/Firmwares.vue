<template>
  <div>
    <div class="page-header">
      <h2>Firmware Management</h2>

      <el-button
        type="primary"
        @click="uploadDialogVisible = true"
      >
        Upload Firmware
      </el-button>
    </div>

    <el-table
      :data="firmwares"
      border
      style="width:100%;margin-top:20px;"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="70"
      />

      <el-table-column
        prop="version"
        label="Version"
        width="110"
      />

      <el-table-column
        label="Channel"
        width="110"
      >
        <template #default="scope">
          <el-tag
            v-if="scope.row.channel === 'stable'"
            type="success"
          >
            Stable
          </el-tag>

          <el-tag
            v-else-if="scope.row.channel === 'beta'"
            type="warning"
          >
            Beta
          </el-tag>

          <el-tag
            v-else
            type="danger"
          >
            Alpha
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="product_name"
        label="Product"
        width="160"
      >
        <template #default="scope">
          {{ scope.row.product_name || `Product ${scope.row.product_id}` }}
        </template>
      </el-table-column>

      <el-table-column
        prop="hardware_version"
        label="Hardware"
        width="110"
      />

      <el-table-column
        prop="min_version"
        label="Minimum Version"
        width="150"
      />

      <el-table-column
        prop="file_name"
        label="File Name"
        width="280"
      />

      <el-table-column
        prop="file_size"
        label="Size"
        width="100"
      >
        <template #default="scope">
          {{ formatFileSize(scope.row.file_size) }}
        </template>
      </el-table-column>

      <el-table-column
        label="Force Update"
        width="120"
      >
        <template #default="scope">
          <el-tag
            v-if="Number(scope.row.force_update) === 1"
            type="danger"
          >
            Yes
          </el-tag>

          <el-tag
            v-else
            type="info"
          >
            No
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="published_at"
        label="Published At"
        width="180"
      />

      <el-table-column
        label="Action"
        width="120"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row.id)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="uploadDialogVisible"
      title="Upload Firmware"
      width="560px"
    >
      <el-form label-width="150px">
        <el-form-item label="Version">
          <el-input
            v-model="uploadForm.version"
            placeholder="1.1.0"
          />
        </el-form-item>

        <el-form-item label="Channel">
          <el-select
            v-model="uploadForm.channel"
            style="width:100%;"
          >
            <el-option
              label="Stable"
              value="stable"
            />

            <el-option
              label="Beta"
              value="beta"
            />

            <el-option
              label="Alpha"
              value="alpha"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Product">
          <el-select
            v-model="uploadForm.product_id"
            style="width:100%;"
          >
            <el-option
              label="ORION Standard"
              :value="1"
            />

            <el-option
              label="ORION Pro"
              :value="2"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Hardware Version">
          <el-input
            v-model="uploadForm.hardware_version"
            placeholder="A1"
          />
        </el-form-item>

        <el-form-item label="Minimum Version">
          <el-input
            v-model="uploadForm.min_version"
            placeholder="1.0.0"
          />
        </el-form-item>

        <el-form-item label="Force Update">
          <el-switch
            v-model="uploadForm.force_update"
          />
        </el-form-item>

        <el-form-item label="Release Notes">
          <el-input
            v-model="uploadForm.release_notes"
            type="textarea"
            :rows="4"
            placeholder="Update notes"
          />
        </el-form-item>

        <el-form-item label="Firmware File">
          <input
            ref="fileInput"
            type="file"
            accept=".bin"
            @change="handleFileChange"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button
          @click="closeUploadDialog"
        >
          Cancel
        </el-button>

        <el-button
          type="primary"
          :loading="uploading"
          @click="handleUpload"
        >
          Upload
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
} from "vue";

import {
  getFirmwares,
  deleteFirmware,
  uploadFirmware,
} from "../api/firmware";

const firmwares = ref([]);
const uploadDialogVisible = ref(false);
const uploading = ref(false);
const fileInput = ref(null);

function createDefaultUploadForm() {
  return {
    version: "",
    channel: "stable",
    product_id: 2,
    hardware_version: "A1",
    min_version: "1.0.0",
    force_update: false,
    release_notes: "",
    file: null,
  };
}

const uploadForm = ref(
  createDefaultUploadForm()
);

async function loadFirmwares() {
  try {
    const res = await getFirmwares();

    firmwares.value = res.data.data;
  } catch (err) {
    console.error(err);
    alert("Failed to load firmwares");
  }
}

function handleFileChange(event) {
  uploadForm.value.file =
    event.target.files?.[0] || null;
}

function resetUploadForm() {
  uploadForm.value =
    createDefaultUploadForm();

  if (fileInput.value) {
    fileInput.value.value = "";
  }
}

function closeUploadDialog() {
  uploadDialogVisible.value = false;
  resetUploadForm();
}

async function handleUpload() {
  if (!uploadForm.value.version.trim()) {
    alert("Version is required");
    return;
  }

  if (!uploadForm.value.hardware_version.trim()) {
    alert("Hardware version is required");
    return;
  }

  if (!uploadForm.value.min_version.trim()) {
    alert("Minimum version is required");
    return;
  }

  if (!uploadForm.value.file) {
    alert("Firmware file is required");
    return;
  }

  const formData = new FormData();

  formData.append(
    "version",
    uploadForm.value.version.trim()
  );

  formData.append(
    "channel",
    uploadForm.value.channel
  );

  formData.append(
    "product_id",
    String(uploadForm.value.product_id)
  );

  formData.append(
    "hardware_version",
    uploadForm.value.hardware_version.trim()
  );

  formData.append(
    "min_version",
    uploadForm.value.min_version.trim()
  );

  formData.append(
    "force_update",
    uploadForm.value.force_update ? "1" : "0"
  );

  formData.append(
    "release_notes",
    uploadForm.value.release_notes
  );

  formData.append(
    "firmware",
    uploadForm.value.file
  );

  uploading.value = true;

  try {
    await uploadFirmware(formData);

    uploadDialogVisible.value = false;
    resetUploadForm();

    await loadFirmwares();

    alert("Firmware uploaded successfully");
  } catch (err) {
    console.error(err);

    const message =
      err.response?.data?.message ||
      "Upload failed";

    alert(message);
  } finally {
    uploading.value = false;
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

    const message =
      err.response?.data?.message ||
      "Delete failed";

    alert(message);
  }
}

function formatFileSize(size) {
  const bytes = Number(size);

  if (!Number.isFinite(bytes)) {
    return "-";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    1024 /
    1024
  ).toFixed(1)} MB`;
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
