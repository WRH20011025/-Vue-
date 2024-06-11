<template>
  <el-card>
    <div>
      <el-page-header content="销售列表" icon="" title="销售管理"/>
      <div class="input">
        <el-input v-model="searchTerm" placeholder="请输入搜索内容"></el-input>
        <el-button @click="searchData" :icon="Search"></el-button>
      </div>
      <el-table :data="filteredData" height="400" style="width: 100%">
        <el-table-column prop="id" label="订单编号" width="180"/>
        <el-table-column prop="username" label="客户" width="180"/>
        <!--        <el-table-column prop="origin" label="商品产地" width="120"/>-->
        <!--        <el-table-column prop="batch_id" label="生产批号" width="180"/>-->
        <el-table-column prop="totalAmount" label="总价格" width="180"/>
        <!--        <el-table-column prop="packaging" label="商品个数" width="180"/>-->
        <!--        <el-table-column prop="packaging" label="包装单位" width="180"/>-->

        <el-table-column label="商品详情" width="360">
          <template v-slot="{ row }">
            <div v-for="item in row.selectedProducts" :key="item.title">
              {{ item.title }} (数量: {{ item.quantity }})
            </div>
          </template>
        </el-table-column>
        <!--        <el-table-column label="商品有效期" width="180">-->
        <!--          <template #default="scope">-->
        <!--            {{ formatTime.getTime(scope.row.product_expiry_date) }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="更新时间" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-popconfirm title="你确定要删除吗"
                           confirm-button-text="确定"
                           cancel-button-text="取消"
                           @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button
                    circle :icon="Delete"
                    type="danger"
                >
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import {Edit, Delete, Search} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
const store = useStore()
const router = useRouter()
const tableData = ref([]);
onMounted(() => {
  getTableData();

});
const searchTerm = ref(''); // 添加一个新的响应式引用来存储搜索词
const filteredData = ref([]); // 添加一个新的响应式引用来存储过滤后的数据

// 搜索函数
const searchData = () => {
  if (!searchTerm.value) {
    filteredData.value = tableData.value;
  } else {
    filteredData.value = tableData.value.filter(item =>
        item.id.toString().includes(searchTerm.value) ||
        item.username.includes(searchTerm.value)
    );
  }
};

const getTableData = async () => {
  const res = await axios.get(`/adminapi/sales/list`);
     console.log(res.data.data)
  tableData.value = res.data.data;
  filteredData.value = tableData.value;

};


//删除回调
const handleDelete = async (item) => {
  // console.log(item)
  const role = store.state.userInfo.role;
  if (role !== '2')
  {
    await axios.delete(`/adminapi/sales/list/${item.id}`)
  await getTableData()
  }
  else {
    alert('你没有权限删除这个内容');
  }
}

</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
.input {
  margin-top: 10px; /* 与上一行拉开距离 */
  width: 300px; /* 设置宽度 */
  border-radius: 25px; /* 设置圆角 */
  display: flex; /* 让输入框和按钮在同一行 */

}
.el-button {
  margin-left: 10px; /* 添加一些左边距以分隔输入框和按钮 */

}

.el-button:hover {
  background-color: #7fd5ef; /* 改变鼠标悬停在按钮上时的背景颜色 */
}
::v-deep .htmlcontent {
  img {
    max-width: 100%;
  }
}
</style>
