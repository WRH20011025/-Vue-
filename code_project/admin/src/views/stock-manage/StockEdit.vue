<template>
  <div>
    <el-page-header content="编辑商品" @back="handleBack()" title="商品管理"/>
    <el-form
        ref="stockFormRef"
        :model="stockForm"
        :rules="stockFormRules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="stockForm.title"/>
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input v-model="stockForm.supplier"/>
      </el-form-item>
      <el-form-item label="商品类别" prop="category">
        <el-select v-model="stockForm.category" placeholder="请选择">
          <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品个数" prop="item_count">
        <el-input v-model="stockForm.item_count"/>
      </el-form-item>
<!--      <el-form-item label="商品产地" prop="origin">-->
<!--        <el-input v-model="stockForm.origin"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生产批号" prop="batch_id">-->
<!--        <el-input v-model="stockForm.batch_id"/>-->
<!--      </el-form-item>-->
      <el-form-item label="批准文号" prop="approval">
        <el-input v-model="stockForm.approval"/>
      </el-form-item>
<!--      <el-form-item label="包装单位" prop="packaging">-->
<!--        <el-input v-model="stockForm.packaging"/>-->
<!--      </el-form-item>-->
      <el-form-item label="商品规格" prop="item_spec">
        <el-input v-model="stockForm.item_spec"/>
      </el-form-item>
      <el-form-item label="销售价格" prop="price">
        <el-input v-model="stockForm.price"/>
      </el-form-item>
<!--      <el-form-item label="商品有效期" prop="product_expiry_date">-->
<!--        <el-date-picker-->
<!--            v-model="stockForm.product_expiry_date"-->
<!--            type="date"-->
<!--            placeholder="Pick a date"-->
<!--            clearable-->
<!--        />-->
<!--      </el-form-item>-->

      <el-form-item label="产品简介" prop="introduction">
        <el-input v-model="stockForm.introduction"
                  type="textarea"/>
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="stockForm.detail"
                  type="textarea"/>
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="stockForm.cover" @fromchange="handleChange "/>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >更新产品
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {ref,reactive,onMounted} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import {ElMessage} from "element-plus";
import {useRouter,useRoute} from "vue-router"
import axios from "axios";

const stockFormRef = ref()
const stockForm =reactive({
  title: "",
  supplier:"",
  origin:"",
  batch_id:"",
  approval:"",
  packaging:"",
  item_spec:"",
  price:"",
  introduction:"",
  detail:"",
  cover : "",
  item_count :"",
  product_expiry_date:"",
  file:null,
})

const stockFormRules =reactive({
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
  approval: [
    {required: true, message: '请输入批准文号', trigger: 'blur'},
  ],
  packaging: [
    {required: true, message: '请输入包装单位', trigger: 'blur'},
  ],
  item_spec: [
    {required: true, message: '请输入商品规格', trigger: 'blur'},
  ],
  price: [
    {required: true, message: '请输入销售价格', trigger: 'blur'},
  ],
  cover: [
    {required: true, message: '请上传头像', trigger: 'blur'},
  ],
  detail: [
    {required: true, message: '请输入详细描述', trigger: 'blur'},
  ],
  introduction: [
    {required: true, message: '请输入简介', trigger: 'blur'},
  ],
  item_count: [
    {required: true, message: '请输入商品个数', trigger: 'blur'},
  ],
  product_expiry_date: [
    {required: true, message: '请输入商品有效期', trigger: 'blur'},
  ],

})
const categories = reactive([
  {value: '零食', label: '零食'},
  {value: '饮料', label: '饮料'},
  {value: '文具', label: '文具'},
  {value: '调味品', label: '调味品'},
  {value: '洗漱用品', label: '洗漱用品'},
  {value: '生活用品', label: '生活用品'},
  {value: '体育用品', label: '体育用品'},
  {value: '床上用品', label: '床上用品'},
  // 添加更多类别...
])
const handleChange = (file) => {
  // console.log(file.raw)
  stockForm.cover = URL.createObjectURL(file);
  stockForm.file = file;
}
const router = useRouter()
const route = useRoute()
const handleBack=()=> {
  router.back()
}
const getData=async ()=> {
  const res = await axios.get(`/adminapi/stock/list/${route.params.id}`);
  console.log(res.data.data);
  Object.assign(stockForm,res.data.data)

}
onMounted(()=> {
  getData()
})
const submitForm = () => {
  stockFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(stockForm)
      // 提交数据到后端
      await upload("/adminapi/stock/list", stockForm)
      // if (res.ActionType === "ok") {
      // store.commit("changeUserInfo", res.data)

      ElMessage.success("更新成功")
      router.push("/stock-manage/stocklist")
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
