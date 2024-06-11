<template>
  <el-card>
    <div>


      <el-page-header content="库存列表" icon="" title="库存管理"/>
      <div class="input">
        <el-input v-model="searchTerm" placeholder="请输入搜索内容"></el-input>
        <el-button @click="searchData" :icon="Search"></el-button>
      </div>

      <el-table :data="filteredData" height="400" style="width: 100%">
        <el-table-column label="商品图片" width="90">
          <template #default="scope">
            <el-avatar
                :size="50"
                :src="'http://localhost:3001' + scope.row.cover">
            </el-avatar>
          </template>

        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="180"/>
        <el-table-column prop="supplier" label="供应商" width="120"/>
        <!--        <el-table-column prop="origin" label="商品产地" width="120"/>-->
        <!--        <el-table-column prop="batch_id" label="生产批号" width="180"/>-->
        <el-table-column prop="category" label="商品类别" width="180"/>
        <el-table-column prop="item_count" label="库存数量" width="180">
          <template #default="scope">
            {{ scope.row.item_count }} 件
          </template>
        </el-table-column>

        <el-table-column prop="sold_count" label="已售数量" width="180">
          <template #default="scope">
            {{ scope.row.sold_count }} 件
          </template>
        </el-table-column>
        <el-table-column prop="approval" label="批准文号" width="180"/>
        <!--        <el-table-column prop="packaging" label="商品个数" width="180"/>-->
        <!--        <el-table-column prop="packaging" label="包装单位" width="180"/>-->
        <el-table-column prop="item_spec" label="商品规格" width="120"/>
        <el-table-column prop="price" label="销售价格" width="120"/>
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
            <el-button circle :icon="Edit" @click="handleEdit( scope.row)"
            >
            </el-button
            >
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
import {ref, onMounted, computed } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import {Edit, Delete,Search} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'

const router = useRouter()
const tableData = ref([]);
const searchTerm = ref(''); // 添加一个新的响应式引用来存储搜索词
const filteredData = ref([]); // 添加一个新的响应式引用来存储过滤后的数据
// 计算属性，根据搜索词过滤表格数据
// 搜索函数
const searchData = () => {
  if (!searchTerm.value) {
    filteredData.value = tableData.value;
  } else {
    filteredData.value = tableData.value.filter(item => item.title.includes(searchTerm.value));
  }
};

// 计算已售数量的函数
const calculateSoldCounts = (salesData) => {
  const soldCounts = {};
  salesData.forEach(sale => {
    sale.selectedProducts.forEach(product => {
      if (soldCounts[product.id]) {
        soldCounts[product.id] += product.quantity;
      } else {
        soldCounts[product.id] = product.quantity;
      }
    });
  });
  return soldCounts;
};

// 更新获取数据的函数

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get(`/adminapi/stock/list`);
     console.log(res.data.data)
  tableData.value = res.data.data;
  filteredData.value = tableData.value; // 页面加载时显示所有数据
  // 获取销售数据
  const salesResponse = await axios.get(`/adminapi/sales/list`);
  const salesData = salesResponse.data.data;

  // 计算已售数量
  const soldCounts = calculateSoldCounts(salesData);

  // 将已售数量添加到库存数据中
  tableData.value.forEach(item => {
    item.sold_count = soldCounts[item.id] || 0;
  });

};


//删除回调
const handleDelete = async (item) => {
  // console.log(item)
  await axios.delete(`/adminapi/stock/list/${item.id}`)
  await getTableData()
}

//编辑回调
const handleEdit = (item) => {
  //跳转到/product-manage/editstock/${item._id}

  router.push(`/stock-manage/editstock/${item.id}`)
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
