<template>

    <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :auto-upload="false"

        :on-change="handleChange"
    >
      <img v-if="props.avatar" :src="uploadAvater" class="avatar"/>

      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>

    </el-upload>

</template>
<script setup>
import {Plus} from "@element-plus/icons-vue";
import {computed, defineEmits, defineProps,} from 'vue'

// 每次选择完图片的回调
const props = defineProps({
  avatar:String,
})
// 当用户选择一个新的图片文件时，它会被调用。它接收一个参数file，这个参数包含了关于被选中文件的信息。然后，它会触发一个名为fromchange的事件，并将文件作为参数传递出去。
const handleChange = (file) => {
  // console.log(file.raw)
  emit("fromchange",file.raw)
}
// 这是一个计算属性，它返回一个URL，该URL指向要显示的图片。如果props.avatar包含"blob"，那么它就返回props.avatar，否则，它返回’http://localhost:3001’ + props.avatar。
const uploadAvater = computed(() => props.avatar.includes("blob") ? props.avatar : 'http://localhost:3001' + props.avatar)
const emit =defineEmits(["fromchange"])
</script>
<style scoped lang="scss">

::v-deep .el-upload {
  border: 2px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  height: 178px;
  width: 178px;
}
</style>