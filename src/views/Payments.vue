<template>
  <div>

    <div class="page-header">
      <h2>Payment Management</h2>
    </div>
   <el-row
  :gutter="15"
  style="margin:20px 0;"
>

  <el-col :span="8">

    <el-input
      v-model="filters.keyword"
      placeholder="Payment / Order / User"
      clearable
    />

  </el-col>

  <el-col :span="4">

    <el-select
      v-model="filters.status"
      placeholder="Status"
      clearable
      style="width:100%;"
    >
      <el-option label="Paid" value="paid" />
      <el-option label="Pending" value="pending" />
      <el-option label="Failed" value="failed" />
    </el-select>

  </el-col>

  <el-col :span="4">

    <el-select
      v-model="filters.provider"
      placeholder="Provider"
      clearable
      style="width:100%;"
    >
      <el-option label="Mock" value="mock" />
      <el-option label="WeChat" value="wechat" />
      <el-option label="Alipay" value="alipay" />
    </el-select>

  </el-col>

  <el-col :span="3">

    <el-button
      type="primary"
@click="handleSearch"
    >
      Search
    </el-button>

  </el-col>

</el-row>
    <el-table
      :data="payments"
      border
      style="width:100%;margin-top:20px;"
    >

      <el-table-column
        prop="id"
        label="ID"
        width="70"
      />

      <el-table-column
        prop="payment_no"
        label="Payment No"
        width="230"
      />

      <el-table-column
        prop="order_no"
        label="Order No"
        width="190"
      />

      <el-table-column
        prop="username"
        label="User"
        width="140"
      />

      <el-table-column
        prop="product"
        label="Product"
        width="150"
      />

      <el-table-column
        prop="provider"
        label="Provider"
        width="110"
      />

      <el-table-column
        prop="amount"
        label="Amount"
        width="100"
      />

      <el-table-column
        prop="currency"
        label="Currency"
        width="100"
      />

      <el-table-column
        label="Status"
        width="120"
      >
        <template #default="scope">

          <el-tag
            v-if="scope.row.status === 'paid'"
            type="success"
          >
            Paid
          </el-tag>

          <el-tag
            v-else-if="scope.row.status === 'pending'"
            type="warning"
          >
            Pending
          </el-tag>

          <el-tag
            v-else-if="scope.row.status === 'failed'"
            type="danger"
          >
            Failed
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
        prop="transaction_id"
        label="Transaction ID"
        width="230"
      />

      <el-table-column
        prop="paid_at"
        label="Paid At"
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
      @click="viewPayment(scope.row.id)"
    >
      View
    </el-button>

  </template>
</el-table-column>
    </el-table>
<el-pagination
  style="margin-top:20px;justify-content:flex-end;"
  background
  layout="prev, pager, next, total"
  :current-page="pagination.page"
  :page-size="pagination.limit"
  :total="pagination.total"
  @current-change="handlePageChange"
/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPayments } from "../api/payment";

const payments = ref([]);
const filters = ref({
  keyword: "",
  status: "",
  provider: "",
});
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});
const router = useRouter();
async function loadPayments() {
  try {
const res = await getPayments({
  page: pagination.value.page,
  limit: pagination.value.limit,
  keyword: filters.value.keyword,
  status: filters.value.status,
  provider: filters.value.provider,
});
    payments.value = res.data.data.items;

    pagination.value.total =
      res.data.data.pagination.total;
  } catch (err) {
    console.error(err);
  }
}
function viewPayment(id) {
    router.push(`/payments/${id}`);
}
function handleSearch() {
  pagination.value.page = 1;
  loadPayments();
}
function handlePageChange(page) {
  pagination.value.page = page;
  loadPayments();
}
onMounted(() => {
  loadPayments();
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
