<template>
  <el-card>
    <div>
      <el-page-header content="临期商品列表" icon="" title="库存管理"/>
      <el-table :data="filteredData" height="400" style="width: 100%">
        <el-table-column label="商品图片" width="90">
          <template #default="scope">
            <el-avatar
                :size="50"
                :src="'http://localhost:3001' + scope.row.stock.cover">
            </el-avatar>
          </template>

        </el-table-column>
        <el-table-column prop="id" label="批次 ID" />
        <el-table-column prop="stock.title" label="商品名称" />
        <el-table-column prop="stock.supplier" label="供应商" />
        <el-table-column  label="过期时间" >
          <template #default="scope">
            {{ formatTime.getTime(scope.row.expiry) }}
          </template>
        </el-table-column>
        <el-table-column
            label="有效期情况"
        >
          <template #default="scope">
        <span v-if="Math.floor((new Date() - new Date(scope.row.expiry)) / (1000 * 60 * 60 * 24)) < 0">
            临期 {{ Math.abs(Math.floor((new Date() - new Date(scope.row.expiry)) / (1000 * 60 * 60 * 24))) }} 天
        </span>
            <span v-else>
            过期 <span class="expired-days">{{ Math.floor((new Date() - new Date(scope.row.expiry)) / (1000 * 60 * 60 * 24)) }}</span> 天
        </span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="180"
        >
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
            <el-button
                v-if="Math.floor((new Date() - new Date(scope.row.expiry)) / (1000 * 60 * 60 * 24)) < 0"
                @click="openSpecialPriceDialog(scope.row)"
                circle :icon="Edit"
                type="primary"
                :disabled="stockForm.item_count === 0"
            >

            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <el-dialog
      v-model="dialogVisible"
      title="生成特价商品"
      width="50%"

  >
    <!--      <span>This is a message</span>-->
    <el-form
        ref="stockFormRef"
        :model="stockForm"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="title" label-width="100px">

        <el-input v-model="stockForm.title"/>
        <!--        <el-input v-model="stockForm.item_count"/>-->
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input v-model="stockForm.supplier"/>
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-select v-model="stockForm.discount" placeholder="请选择折扣">
          <el-option label="9折" value="0.9"></el-option>
          <el-option label="8折" value="0.8"></el-option>
          <el-option label="5折" value="0.5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销售价格" prop="price">
        <el-input v-model="discountedPrice" disabled/>
      </el-form-item>
      <el-form-item label="商品个数" prop="item_count">
        <el-input-number :disabled="stockForm.item_count === 0" v-model="stockForm.item_count" :min="0" :max="stockForm.item_count" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="stockForm.cover" @fromchange="handleChange "/>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :disabled="stockForm.item_count === 0" @click="handleEditConfirm()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref, onMounted, computed, reactive} from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import {Edit, Delete,Search} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'

const stockFormRef = ref()
const stockForm =reactive({
  title: "",
  supplier:"",
  category: "特价商品",
  discount: "",
  // origin:"",
  // batch_id:"",
  approval:"0",
  // packaging:"",
  item_spec:"0",
  price:"",
  introduction:"特价商品",
  detail:"特价商品",
  cover : "",
  item_count :"",
  // product_expiry_date:"",
  // id,title,supplier,approval,item_spec,price,detail,introduction,cover,item_count
  file:null,
})

const dialogVisible = ref(false);
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
const discountedPrice = computed(() => {
  return stockForm.price * stockForm.discount;
});

onMounted(() => {
  getTableData();
});
const handleChange = (file) => {
  // console.log(file.raw)
  stockForm.cover = URL.createObjectURL(file);
  stockForm.file = file;
}
const getTableData = async () => {
  const res = await axios.get(`/adminapi/stock/expired`);
  console.log(res.data.data)
  tableData.value = res.data.data.sort((a, b) => {
    // 获取商品A和商品B的过期时间
    const expiryDateA = new Date(a.expiry);
    const expiryDateB = new Date(b.expiry);
    // 获取当前时间
    const currentDate = new Date();
    // 计算商品A和商品B与当前时间的时间差（以毫秒为单位）
    const diffTimeA = expiryDateA.getTime() - currentDate.getTime();
    const diffTimeB = expiryDateB.getTime() - currentDate.getTime();
    // 将时间差转换为天数
    const diffDaysA = Math.ceil(diffTimeA / (1000 * 60 * 60 * 24));
    const diffDaysB = Math.ceil(diffTimeB / (1000 * 60 * 60 * 24));
    // 按照临期的商品排在前面，过期的商品排在后面的顺序进行排序
    return diffDaysB - diffDaysA;
  });
  filteredData.value = tableData.value; // 页面加载时显示所有数据
};

// 添加特价商品的回调
// 打开添加特价商品的对话框
const openSpecialPriceDialog = async (item) => {
  // 设置表单的初始值
  const res = await axios.get(`/adminapi/stock/list/${item.stock_id}`)
  console.log(res.data.data)
  // userForm = res.data.data[0]
  Object.assign(stockForm,res.data.data)
  dialogVisible.value = true
}

// 确认添加特价商品
const handleEditConfirm = async () => {
  // 提交数据到后端
  stockForm.title = "特价商品 " + stockForm.title;
  console.log(stockForm)
  stockForm.originalCover = stockForm.cover;

  await upload(`/adminapi/stock/add`, stockForm);
  const originalItem = tableData.value.find(item => item.stock_id === stockForm.id);
  console.log(originalItem)
  if (originalItem) {
    originalItem.item_count -= stockForm.item_count;
    await axios.put(`/adminapi/stock/update/${originalItem.stock_id}`, originalItem);
  }
  // 关闭对话框
  dialogVisible.value = false;
  // 刷新表格数据
  await getTableData();
}
//删除回调
const handleDelete = async (item) => {
  // console.log(item)
  await axios.delete(`/adminapi/purchasing/list/${item.id}`)
  await getTableData()
}

//编辑回调
// const handleEdit = (item) => {
//   //跳转到/product-manage/editstock/${item._id}
//
//   router.push(`/stock-manage/editstock/${item.id}`)
// }
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
.input {
  margin-top: 10px; /* 与上一行拉开距离 */
  width: 300px; /* 设置宽度 */
  border-radius: 10px; /* 设置圆角 */
  display: flex; /* 让输入框和按钮在同一行 */
}
.el-button {
  margin-left: 10px; /* 添加一些左边距以分隔输入框和按钮 */
}
.expired-days {
  color: red; /* 红色 */
  font-size: 19px;
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
