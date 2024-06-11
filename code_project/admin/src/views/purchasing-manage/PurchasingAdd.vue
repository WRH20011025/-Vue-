<template>
  <div>
    <el-page-header content="添加采购订单" icon="" title="采购管理"/>
    <el-form
        ref="purchasingFormRef"
        :model="purchasingForm"
        :rules="purchasingFormRules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="title" label-width="100px">
        <el-select
            v-model="purchasingForm.title"
            class="m-2"
            placeholder="qing"
            style="width: 100%"
            @change="updateSupplier"
        >
          <el-option
              v-for="title in filteredProducts"
              :key="title"
              :label="title"
              :value="title"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="供应商" prop="supplier" label-width="100px">
        <el-select
            v-model="purchasingForm.supplier"
            class="m-2"
            placeholder="qing"
            style="width: 100%"
            @change="updateProducts"
        >
          <el-option
              v-for="item in uniqueSuppliers"
              :key="item"
              :label="item"
              :value="item"
          />

        </el-select>
<!--        <el-input v-model="stockForm.supplier"/>-->
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

<!--      <el-form-item label="商品图片" prop="cover">-->
<!--        <Upload :avatar="stockForm.cover" @fromchange="handleChange "/>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >添加订单
        </el-button>

      </el-form-item>
    </el-form>

  </div>
</template>
<script setup>
import {ref, reactive, onMounted , computed,watch,watchEffect} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import {ElMessage,ElMessageBox  } from "element-plus";
import {useRouter} from "vue-router"
import axios from "axios";

const purchasingFormRef = ref()
const purchasingForm =reactive({
  title: "",
  supplier:"",
  origin:"",
  stock_id:"",
  batch_id:"",
  packaging:"",
  item_count :0,
  cost:"",
  expiry:"",
  location:"",
  phone:""
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
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的电话号码（中国大陆格式）",
      trigger: "blur",
    },
    // {
    //   pattern: /^\d{11}$/,
    //   message: "请输入11位的电话号码",
    //   trigger: "blur",
    // },
  ],
  // product_expiry_date: [
  //   {required: true, message: '请输入商品有效期', trigger: 'blur'},
  // ],

})
const uniqueSuppliers = ref([]);
const tableData = ref([])
onMounted(async () => {
  await getTableData();
  updateProducts("");


  const supplierSet = new Set(tableData.value.map(item => item.supplier));
  uniqueSuppliers.value = Array.from(supplierSet);
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/stock/list")
  console.log(res.data)
  tableData.value = res.data.data

}

const router = useRouter()
const submitForm = () => {
  purchasingFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(purchasingForm)
      // 提交数据到后端
      await upload("/adminapi/purchasing/add",purchasingForm)
      // if (res.ActionType === "ok") {
      // store.commit("changeUserInfo", res.data)

      ElMessage.success("更新成功")
      router.push("/purchasing-manage/Purchasinglist")
      // }
    }
  })
}
// 通过商品名更新供应商 双向绑定
watch(() => purchasingForm.title, (newVal) => {

  let selectedProduct = tableData.value.find(item => item.title === newVal);
  if (selectedProduct) {
    purchasingForm.supplier = selectedProduct.supplier;
  }
})

watch(() => purchasingForm.supplier, (newVal) => {
  let selectedProduct = tableData.value.find(item => item.supplier === newVal);
  if (selectedProduct) {
    purchasingForm.title = selectedProduct.title;
  }
})
const updateSupplier = (title) => {
  let selectedProduct = tableData.value.find(item => item.title === title);
  if (selectedProduct) {
    purchasingForm.supplier = selectedProduct.supplier;
  }
}
const filteredProducts = ref([]);
const updateProducts = (supplier) => {
  let relatedProducts;
  // 如果没有选择供应商，则显示所有商品
  if (!supplier) {
    relatedProducts = tableData.value;
  } else {
    relatedProducts = tableData.value.filter(item => item.supplier === supplier);
  }
  filteredProducts.value = relatedProducts.map(item => item.title);
  if (relatedProducts.length > 0) {
    purchasingForm.title = relatedProducts[0].title;
  }
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>
