<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理"/>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"/>
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                  :size="50"
                  :src="'http://localhost:3001' + scope.row.avatar">
              </el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>

            </div>
          </template>

        </el-table-column>
        <el-table-column label="权限">
          <template #default="scope">
            <!--            {{scope.row.role}}-->
            <el-tag v-if="scope.row.role==='1'" class="ml-2" type="success">管理员</el-tag>
            <el-tag v-else-if="scope.row.role==='4'" class="ml-2" type="success">超级管理员</el-tag>
            <el-tag v-else class="ml-2" type="warning">员工</el-tag>

          </template>

        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit( scope.row)"
            >编辑
            </el-button
            >
            <el-popconfirm title="你确定要删除吗"
                           confirm-button-text="确定"
                           cancel-button-text="取消"
                           @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>


    </el-card>

    <el-dialog
        v-model="dialogVisible"
        title="编辑用户"
        width="50%"

    >
      <!--      <span>This is a message</span>-->
      <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          label-width="80px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"/>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select
              v-model="userForm.role"
              class="m-2"
              placeholder="Select"
              style="width: 100%"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="userForm.introduction"
                    type="textarea"/>
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
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import Upload from "@/components/upload/Upload.vue";
import {useStore} from "vuex";
const store = useStore()
const dialogVisible = ref(false);
const userFormRef = ref();
let userForm =reactive({
  username: "",
  password: "",
  role:'2',//1是管理员 2是员工
  introduction:"",
  // id:"",

});
const userFormRules =reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  role: [
    {required: true, message: '请选择权限', trigger: 'blur'},
  ],
  introduction: [
    {required: true, message: '请输入简介', trigger: 'blur'},
  ],
})
const options = [
  {
    label: "管理员",
    value: '1'
  },
  {
    label: "员工",
    value: '2'
  }
]
const tableData = ref([])
onMounted(() => {
  getTableData()
})

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list")
  // console.log(res.data)
  tableData.value = res.data.data
}
const handleEdit = async data => {
  // console.log(data)
  const res = await axios.get(`/adminapi/user/list/${data.id}`)
  // console.log(res.data.data)
  // userForm = res.data.data[0]
  Object.assign(userForm,res.data.data)
  dialogVisible.value = true
}
const handleEditConfirm =  () => {
  userFormRef.value.validate(async (valid)=>{
    if (valid){
      // console.log(userForm)
      await axios.put(`/adminapi/user/list/${userForm.id}`,userForm)
    }

    dialogVisible.value = false

    getTableData()
  })
}
const handleDelete = async data => {
  // 获取当前用户的角色
  const role = store.state.userInfo.role;

  // 角色4可以删除任何内容
  if (role === '4' && data.role !== '4') {
    await deleteData(data);
  } else if (role === '1') {
    // 角色1只能删除角色2和3的内容
    if (data.role === '2' || data.role === '3') {
      await deleteData(data);
    } else {
      // 提示无权限删除
      alert('你没有权限删除这个内容');
    }
  } else {
    // 其他角色无删除权限
    alert('你没有权限删除这个内容');
  }
}

const deleteData = async data => {
  // console.log(data.id);
  await axios.delete(`/adminapi/user/list/${data.id}`)
  //reload page
  // reload data
  getTableData()
  // tabledata 本地删除
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>