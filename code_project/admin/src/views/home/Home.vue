<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
      <el-page-header content="首页" icon="" title="校园便利店库存管理系统"/>
      <el-card class="box-card">
        <el-row>
          <el-col :span="4">
            <el-avatar :size="100" :src="avatarUrl" />
          </el-col>
          <el-col :span="20">
            <h3 style="line-height: 100px">欢迎 {{$store.state.userInfo.username}} 回来，{{welcomeText}}</h3>
          </el-col>

        </el-row>
      </el-card>
      <div style="display: flex;justify-content: flex-end;">
        <el-card class="box-card" style="flex: 4;">
          <div id="sales-trend-chart" style="width: 100%;height:500px;"></div>
        </el-card>
        <el-card class="box-card" style="flex: 3; margin-left: 20px;">
          <div id="sales-chart" style="width: 100%;height:500px;"></div>
        </el-card>
        <el-card class="box-card" style="flex: 3; margin-left: 20px;">
          <div id="inventory-chart" style="width: 100%;height:500px;"></div>
        </el-card>
      </div>

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>新闻资讯</span>
          </div>

        </template>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in newList" :key="item.id">
            <div :style="{
              backgroundImage:`url(http://localhost:3001${item.cover})`,
              backgroundSize: 'cover'
            }"><h3>{{ item.title }}</h3></div>
          </el-carousel-item>
        </el-carousel>

      </el-card>


    </div>
</template>
<script setup>
// import axios from 'axios'
import {useStore} from 'vuex'
import {computed, onMounted,ref,onBeforeUnmount } from 'vue'
import axios from "axios";
import * as echarts from "echarts";
import { ElNotification } from 'element-plus'

const store = useStore()
const loopList = ref()
const newList = ref()
const List = ref()
console.log(store.state)

const avatarUrl = computed(()=>store.state.userInfo.avatar?'http://localhost:3001'+store.state.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const welcomeText = computed(()=>new Date().getHours()<12?'喝杯咖啡提提神吧，要认真过好每一天哦':'你看上去有点累，休息一下吧')
// axios.get("/adminapi/user/home").then(res=>{
//   console.log(res.data)
// })
const tableData = ref([]);
onMounted(() => {
  getData();
  getTableData();
  getSalesTrendData();
});

const getData = async () => {
  const newres = await axios.get(`/adminapi/news/list`);
  newList.value = newres.data.data;
  const res = await axios.get(`/adminapi/stock/list`);
  //    console.log(res.data.data)
  loopList.value = res.data.data;

  for (let item of loopList.value) {
    if (item.item_count < 30) {
      ElNotification({
        title: '库存预警',
        message: `商品 "${item.title}" 的库存不足，只剩下 ${item.item_count} 件了！,快通知采购员补货吧`,
        type: 'warning'
      });
    }
  }
  const pres = await axios.get(`/adminapi/purchasing/list`);
  console.log(pres);
  List.value = pres.data.data;

  let currentDate = new Date(); // 获取当前日期

  for (let item of List.value) {
    let expiryDate = new Date(item.expiry); // 获取商品的有效期日期
    let diffTime = Math.abs(expiryDate - currentDate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 计算有效期与当前日期的差值（以天为单位）

    if (diffDays <= 7) {
      ElNotification({
        title: '有效期预警',
        message: `商品 "${item.stock.title}" 的有效期将在 ${diffDays} 天后到期，请注意！`,
        type: 'warning'
      });
    }
  }
  // console.log(loopList.value)
  let inventoryData = res.data.data;
  let myChart = echarts.init(document.getElementById('inventory-chart'));
  let productMap = new Map();
  inventoryData.forEach(product => {
    if (productMap.has(product.title)) {
      productMap.set(product.title, productMap.get(product.title) + parseInt(product.item_count));
    } else {
      productMap.set(product.title, parseInt(product.item_count));
    }
  });

  let inventoryPieData = Array.from(productMap, ([name, value]) => ({ name, value }));

  let option = {
    title: {
      text: '库存情况',
      subtext: '饼图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: '库存量',
        type: 'pie',
        radius: '50%',
        data: inventoryPieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);

};
const getTableData = async () => {
  const res = await axios.get(`/adminapi/sales/list`);
  console.log(res.data.data)
  tableData.value = res.data.data;
  let myChart = echarts.init(document.getElementById('sales-chart'));
  let productMap = new Map();
  tableData.value.flatMap(item => item.selectedProducts).forEach(product => {
    if (productMap.has(product.title)) {
      productMap.set(product.title, productMap.get(product.title) + product.quantity);
    } else {
      productMap.set(product.title, product.quantity);
    }
  });

  let salesData = Array.from(productMap, ([name, value]) => ({ name, value }));

  let option = {
    title: {
      text: '销售情况',
      subtext: '饼图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: '销售量',
        type: 'pie',
        radius: '50%',
        data: salesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(option);

};
const getSalesTrendData = async () => {
  const res = await axios.get(`/adminapi/sales/list`);

  console.log(res.data.data)
  tableData.value = res.data.data;

  let myChart = echarts.init(document.getElementById('sales-trend-chart'));
  let dateMap = new Map();

  // 过滤出最近七天的销售记录
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  tableData.value = tableData.value.filter(item => new Date(item.editTime) >= oneWeekAgo);

  tableData.value.forEach(sale => {
    let date = new Date(sale.editTime).toISOString().split('T')[0]; // 获取日期
    if (dateMap.has(date)) {
      dateMap.set(date, dateMap.get(date) + sale.totalAmount);
    } else {
      dateMap.set(date, sale.totalAmount);
    }
  });

  let salesData = Array.from(dateMap, ([name, value]) => ({ name, value })).sort((a, b) => a.name.localeCompare(b.name));

  let option = {
    title: {
      text: '销售情况',
      subtext: '最近七天',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: salesData.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        data: salesData.map(item => item.value),
        smooth: true
      }
    ]
  };
  myChart.setOption(option);
};
</script>
<style lang="scss" scoped>
.box-card{
  margin-top:50px;
}
//轮播
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>