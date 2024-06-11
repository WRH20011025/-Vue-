<template>
  <div>
    <el-page-header content="添加销售" icon="" title="销售管理"/>


<!--      <input v-model="salesForm" placeholder="用户名" />-->
<!--    <el-transfer-->
<!--        v-model="salesForm"-->
<!--        filterable-->
<!--        :filter-method="filterMethod"-->
<!--        filter-placeholder="State Abbreviations"-->
<!--        :titles="['所有商品', '已选商品']"-->
<!--        @change="handleTransferChange"-->
<!--        :render-format="renderFormat"-->
<!--        :data="productData"-->
<!--    />-->
<!--      <p>订单总价：{{ totalAmount }} 元</p>-->
<!--      <el-button @click="generateOrder">生成订单</el-button>-->
<!--    </el-card>-->

      <el-form
          ref="salesFormRef"
          :model="salesForm"
          :rules="salesFormRules"
          label-width="80px"
          class="demo-ruleForm"
      >

      <!-- 其他表单项 -->
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="salesForm.username"/>
      </el-form-item>
      <el-form-item label="商品选择">
        <el-transfer
            v-model="selectedProducts"
            :data="productData"
            :titles="['所有商品', '已选商品']"
            :props="{ key: 'title' , label: 'result' }"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入商品名称"
            @change="handleTransferChange" >
          <template #default="{ option }">
            <div class="box">

              {{ option.result }}
              <el-input-number class="right-align"  v-model="option.quantity" :min="0" :max="option.item_count >= 0 ? option.item_count : 0" label="数量" ></el-input-number>



            </div>
          </template>


        </el-transfer>
      </el-form-item>
    </el-form>
      <p style="color: #2d3a4b" >订单总价：{{ totalAmount }} 元</p>

      <!-- 其他表单项 -->
      <!-- ... -->

      <el-button type="primary" @click="submitForm">提交</el-button>


  </div>
</template>
<script setup>
import {ref,reactive,onMounted} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router"
import axios from "axios";


const salesFormRef = ref()
// let result
const salesForm =reactive({
  username: "员工账号",
})
const salesFormRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  // 其他规则...
})
//生成销售记录
let productData = ref([]);

onMounted(() => {
  getProductData();
})
const getProductData = async () => {
  const res = await axios.get(`/adminapi/stock/list`);
  console.log(res.data.data);

  productData.value = res.data.data; // PurchasingModel 的数据
  for (let i = 0; i < res.data.data.length; i++) {
    const product = res.data.data[i];
    product.quantity = 1;
    product.result = `${product.title}(${product.item_count}) ￥${product.price}`;


  }

};
const selectedProducts = ref([]); // 右侧已选商品的数组
const totalAmount = ref(0); // 订单总价

const handleTransferChange = (value) => {
  selectedProducts.value = value;
  totalAmount.value = calculateTotalAmount();
};
const calculateTotalAmount = () => {
  return selectedProducts.value.reduce((total, productKey) => {
    const product = productData.value.find((p) => p.title === productKey);
    const price = product ? parseFloat(product.price) * product.quantity : 0;
    return total + price;
  }, 0);
};
const generateOrder = () => {
  // 在这里生成订单，使用 selectedProducts 和 totalAmount
  // ...
};
const filterMethod = (query, item) => {
  return item.title.toLowerCase().includes(query.toLowerCase());
}
// 格式化显示商品信息

const router = useRouter()
const submitForm = () => {
  salesFormRef.value.validate(async (valid) => {
    if (valid) {

      // 提交数据到后端
      salesForm.selectedProducts = selectedProducts.value.map(productKey => {
        const product = productData.value.find((p) => p.title === productKey);
        return {
          title: product.title,
          quantity: product.quantity,
          price: product.price,
        };
      });
      salesForm.selectedProducts = JSON.stringify(salesForm.selectedProducts);

      salesForm.totalAmount = totalAmount.value;
      console.log(salesForm);
      await upload("/adminapi/sales/add", salesForm)
      // if (res.ActionType === "ok") {
      // store.commit("changeUserInfo", res.data)

      ElMessage.success("更新成功")
      router.push("/sales-manage/saleslist")
      // }
    }
  })
}

</script>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;

}
::v-deep .el-transfer-panel {
  width:500px;
}
.right-align {
  float: right;
  clear: both;

}
.box {
  width:400px;
}
/* 清除浮动 */
.el-transfer .el-transfer-panel__body-item {
  overflow: auto;
}
</style>
