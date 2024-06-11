<template>
  <el-aside width="$store.state.isCollapsed?'64px':'240px'">
    <el-menu :collapse="$store.state.isCollapsed"

    :router="true"
    :default-active="route.fullPath"
    >
      <!--    :collapse-transition="false" 关闭动画-->
<!--导航栏首页-->
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
<!--个人中心-->
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
<!--用户管理-->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!--仓储管理-->
      <el-sub-menu index="/stock-manage">
        <template #title>
          <el-icon><Box /></el-icon>
          <span>库存管理</span>
        </template>
        <el-menu-item index="/stock-manage/stockadd">添加商品</el-menu-item>
        <el-menu-item index="/stock-manage/stocklist">库存列表</el-menu-item>
        <el-menu-item index="/stock-manage/stockexpired">临期商品列表</el-menu-item>
      </el-sub-menu>
      <!--采购管理-->
      <el-sub-menu index="/purchasing-manage" v-admin>
        <template #title>
          <el-icon><DataLine /></el-icon>
          <span>采购订单管理</span>
        </template>
        <el-menu-item index="/purchasing-manage/PurchasingAdd">添加采购订单</el-menu-item>
        <el-menu-item index="/purchasing-manage/Purchasinglist">采购订单列表</el-menu-item>
      </el-sub-menu>

      <!--销售管理-->
      <el-sub-menu index="/sales-manage">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>销售订单管理</span>
        </template>
        <el-menu-item index="/sales-manage/SalesAdd">添加销售订单</el-menu-item>
        <el-menu-item index="/sales-manage/SalesList">销售订单列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage" v-admin>
        <template #title>
          <el-icon><Box /></el-icon>
          <span>新闻公告管理</span>
        </template>
        <el-menu-item index="/news-manage/newsadd">添加新闻公告</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻公告列表</el-menu-item>

      </el-sub-menu>

    </el-menu>
  </el-aside>


</template>
<style lang="scss" scoped>
.el-aside{
  height:100vh;
  .el-menu{
    height:100vh;
  }
}

</style>
<script setup>
import {HomeFilled,Avatar,UserFilled,Box,TrendCharts,DataLine} from '@element-plus/icons-vue'
import {useRoute} from 'vue-router';
import {useStore} from "vuex";

const route = useRoute()
const store = useStore()
const vAdmin = {
  mounted(el){
    console.log(el)
    if (store.state.userInfo.role !== '1' && store.state.userInfo.role !== '4'){
      el.parentNode.removeChild(el);
    }
  }
}
const vRole3 = {
  mounted(el) {
    if (store.state.userInfo.role !== '3'&& store.state.userInfo.role !== '4'&& store.state.userInfo.role !== '1') {
      // 当角色为 '3' 时，只显示 '采购管理'
        el.parentNode.removeChild(el);
    }
  }
}
// console.log(route)
</script>