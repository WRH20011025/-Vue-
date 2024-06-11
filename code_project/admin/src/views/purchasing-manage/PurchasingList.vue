<template>
  <el-card>
    <div>
      <el-page-header content="采购订单列表" icon="" title="采购管理"/>
      <div class="input">
        <el-input v-model="searchTerm" placeholder="请输入搜索内容"></el-input>
        <el-button @click="searchData" :icon="Search"></el-button>
      </div>
      <el-table :data="filteredData" height="400" style="width: 100%">
        <el-table-column label="商品图片" width="90">
          <template #default="scope">
            <el-avatar
                :size="50"
                :src="'http://localhost:3001' + scope.row.stock.cover">
            </el-avatar>
          </template>

        </el-table-column>
        <el-table-column prop="id" label="订单编号" width="100"/>
        <el-table-column prop="stock.title" label="商品名称" width="100"/>
        <el-table-column prop="stock.supplier" label="供应商" width="120"/>
        <el-table-column prop="origin" label="商品产地" width="120"/>
        <el-table-column prop="batch_id" label="生产批号" width="180"/>
<!--        <el-table-column prop="approval" label="批准文号" width="180"/>-->
        <!--        <el-table-column prop="packaging" label="商品个数" width="180"/>-->
        <el-table-column prop="location" label="供货商地址" width="180"/>
        <el-table-column prop="phone" label="供货商电话" width="180"/>
        <el-table-column prop="item_count" label="进货数量" width="120"/>
        <el-table-column prop="cost" label="进货价格" width="120"/>
        <el-table-column label="商品有效期" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.expiry) }}
          </template>
        </el-table-column>
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
  <el-dialog
      v-model="dialogVisible"
      title="自动添加订单"
      width="50%"

  >
    <!--      <span>This is a message</span>-->
    <el-form
        ref="purchasingFormRef"
        :model="purchasingForm"
        :rules="purchasingFormRules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="title" label-width="100px">

        <el-input v-model="purchasingForm.title"/>
        <!--        <el-input v-model="stockForm.item_count"/>-->
      </el-form-item>
      <el-form-item label="供应商" prop="supplier" label-width="100px">
      <el-input v-model="purchasingForm.supplier"/>
      <!--        <el-input v-model="stockForm.item_count"/>-->
    </el-form-item>
      <el-form-item label="进货数量" prop="item_count" label-width="100px">
        <el-input-number v-model="purchasingForm.item_count" :min="30" :max="200" />
        <!--        <el-input v-model="stockForm.item_count"/>-->
      </el-form-item>
      <el-form-item label="商品产地" prop="origin" label-width="100px">
        <el-input v-model="purchasingForm.origin"/>
      </el-form-item>
      <el-form-item label="生产批号" prop="batch_id" label-width="100px">
        <el-input v-model="purchasingForm.batch_id"/>
      </el-form-item>
      <el-form-item label="包装单位" prop="packaging" label-width="100px">
        <el-input v-model="purchasingForm.packaging"/>
      </el-form-item>
      <el-form-item label="进货价格" prop="cost" label-width="100px">
        <el-input v-model="purchasingForm.cost"/>
      </el-form-item>
      <el-form-item label="供货商地址" prop="location" label-width="100px">
        <el-input v-model="purchasingForm.location"/>
      </el-form-item>
      <el-form-item label="供货商电话" prop="phone" label-width="100px">
        <el-input v-model="purchasingForm.phone"/>
      </el-form-item>
      <el-form-item label="商品有效期" prop="expiry" label-width="100px">
        <el-date-picker
            v-model="purchasingForm.expiry"
            type="date"
            placeholder="Pick a date"
            clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref, onMounted, reactive} from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import {Edit, Delete, Search} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus";
import upload from "@/util/upload";
import {useStore} from "vuex";
const store = useStore()
const searchTerm = ref(''); // 添加一个新的响应式引用来存储搜索词
const filteredData = ref([]); // 添加一个新的响应式引用来存储过滤后的数据

// 计算属性，根据搜索词过滤表格数据
// 搜索函数
const searchData = () => {

  if (!searchTerm.value) {
    filteredData.value = tableData.value;
  } else {
    filteredData.value = tableData.value.filter(item =>
        item.id.toString().includes(searchTerm.value) ||
        item.stock.title.includes(searchTerm.value) ||
        item.stock.supplier.includes(searchTerm.value)
    );
  }
};
const dialogVisible = ref(false);
const purchasingFormRef = ref()
const purchasingForm =reactive({
  title: "",
  supplier:"",
  phone:"",
  origin:"",
  stock_id:"",
  batch_id:"",
  packaging:"",
  item_count :0,
  cost:"",
  expiry:"",
  location:"",
  stock:{
    title: "",
    supplier:"",
  }
  // product_expiry_date:"",
  // file:null,
})

const purchasingFormRules =reactive({
  title: [
    {required: true, message: '请输入商品名', trigger: 'blur'},
  ],
  supplier: [
    {required: true, message: '请输入供应商', trigger: 'blur'},
  ],
  origin: [
    {required: true, message: '请输入商品产地', trigger: 'blur'},
  ],
  batch_id: [
    {required: true, message: '请输入生产批号', trigger: 'blur'},
  ],
  packaging: [
    {required: true, message: '请输入包装单位', trigger: 'blur'},
  ],
  item_count: [
    {required: true, message: '请输入商品个数', trigger: 'blur'},
  ],
  cost: [
    {required: true, message: '请输入进货价格', trigger: 'blur'},
  ],
  expiry: [
    {required: true, message: '请输入商品保质期', trigger: 'blur'},
  ],
  location: [
    {required: true, message: '请输入供货商地址', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入供货商电话', trigger: 'blur'},
  ],
  // product_expiry_date: [
  //   {required: true, message: '请输入商品有效期', trigger: 'blur'},
  // ],

})
const router = useRouter()
let tableData = ref([]);
onMounted(() => {
  getTableData();

});
let stock_tableData = ref([]);
const handleEditConfirm = () => {
  purchasingFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(purchasingForm)
      // 提交数据到后端
      const res = await upload("/adminapi/purchasing/add",purchasingForm)
      await getTableData()
      ElMessage.success('订单已更新');

      // ElMessage.success("更新成功")
      await router.push("/purchasing-manage/Purchasinglist");
      location.reload();
      dialogVisible.value = false
      // }
    }
  })
};
// 定义一个异步函数来获取最新的库存数据
const updateStockData = async () => {
  const res = await axios.get("/adminapi/stock/list");
  stock_tableData.value = res.data.data;


};

const getTableData = async () => {
  await updateStockData();
  const res = await axios.get(`/adminapi/purchasing/list`);
     // console.log(res.data.data)
  tableData.value = res.data.data;// PurchasingModel 的数据
  filteredData.value = tableData.value; // 页面加载时显示所有数据

  for (let item of stock_tableData.value) {
    if (item.item_count < 30) {
      const update_res = await axios.get(`/adminapi/stock/list/${item.id}`)
      // console.log(update_res)
      // Object.assign(purchasingForm, update_res.data.data)
      let currentItemData = update_res.data.data;
      ElMessageBox.confirm(`商品 "${item.title}"库存不足，需要更新订单，是否确认更新？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 用户点击"确定"后，更新订单
        // await axios.post(`/adminapi/purchasing/update/${item.id}`);

        Object.assign(purchasingForm, currentItemData);
        // const item_res = await axios.get(`/adminapi/purchasing/list/${data.id}`)
        // console.log(item_res.data.data)
        // // userForm = res.data.data[0]
        // Object.assign(purchasingForm,item_res.data.data)
        dialogVisible.value = true

      }).catch(() => {
        // 用户点击"取消"或者关闭弹窗后，不做任何操作
      });
    }
  }

};

const handleEdit = async (item) => {
  // console.log(data)
  router.push(`/purchasing-manage/editpurchasing/${item.id}`)
  // userForm = res.data.data[0]
  // Object.assign(purchasingForm,res.data.data)

}
// 删除回调
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

