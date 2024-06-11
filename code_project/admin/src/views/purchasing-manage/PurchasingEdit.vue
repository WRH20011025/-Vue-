<template>
  <div>
    <el-page-header content="编辑订单" @back="handleBack()" icon="" title="采购管理"/>
    <el-form
        ref="purchasingFormRef"
        :model="purchasingForm"
        :rules="purchasingFormRules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="stock.title" label-width="100px">
        <el-input v-model="purchasingForm.stock.title" readonly/>
      </el-form-item>
      <el-form-item label="供应商" prop="stock.supplier" label-width="100px">
        <el-input v-model="purchasingForm.stock.supplier" readonly/>
      </el-form-item>
      <el-form-item label="进货数量" prop="item_count" label-width="100px">
        <el-input v-model="purchasingForm.item_count"  readonly/>
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
import {useRoute, useRouter} from "vue-router"
import axios from "axios";


const route = useRoute()
const purchasingFormRef = ref()
const purchasingForm =reactive({
  stock:{
    title: "",
    supplier:"",
  },
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
  ],
  // product_expiry_date: [
  //   {required: true, message: '请输入商品有效期', trigger: 'blur'},
  // ],

})

const tableData = ref([])
onMounted(async () => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get(`/adminapi/purchasing/list/${route.params.id}`)
  console.log(res.data)
  tableData.value = res.data.data
  Object.assign(purchasingForm,res.data.data)

}
const handleBack=()=> {
  router.back()
}
const router = useRouter()
const submitForm = () => {
  purchasingFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(purchasingForm)
      // 提交数据到后端
      let { title, supplier, item_count, ...rest } = purchasingForm;
      await upload("/adminapi/purchasing/update",rest)
      // if (res.ActionType === "ok") {
      // store.commit("changeUserInfo", res.data)

      ElMessage.success("更新成功")
      router.push("/purchasing-manage/purchasinglist")
      // }
    }
  })
}

</script>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>
