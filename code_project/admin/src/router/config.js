import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import PurchasingAdd from '@/views/purchasing-manage/PurchasingAdd.vue'
import Purchasinglist from '@/views/purchasing-manage/PurchasingList.vue'
import PurchasingEdit from '../views/purchasing-manage/PurchasingEdit.vue'
import StockAdd from '../views/stock-manage/StockAdd.vue'
import StockList from '../views/stock-manage/StockList.vue'
import StockEdit from '../views/stock-manage/StockEdit.vue'
import StockExpired from "@/views/stock-manage/StockExpired.vue";
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import SalesAdd from '../views/sales-manage/SalesAdd.vue'
import SalesList from '../views/sales-manage/SalesList'
import NotFound from '../views/notfound/NotFound.vue'
import NewsAdd from "@/views/news-manage/NewsAdd.vue";
import NewsList from "@/views/news-manage/NewsList.vue";
import NewsEdit from "@/views/news-manage/NewsEdit.vue";

const routes =[
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/purchasing-manage/PurchasingAdd",
        component:PurchasingAdd
    },
    {
        path:"/purchasing-manage/Purchasinglist",
        component:Purchasinglist
    },
    {
        path:"/purchasing-manage/editpurchasing/:id",
        component:PurchasingEdit
    },
    {
        path:"/stock-manage/stockadd",
        component:StockAdd
    },
    {
        path:"/stock-manage/stocklist",
        component:StockList
    },
    {
        path:"/stock-manage/editstock/:id",
        component:StockEdit
    },
    {
        path:"/stock-manage/stockexpired",
        component:StockExpired
    },
    {
        path:"/user-manage/useradd",
        component:UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-manage/userlist",
        component:UserList,
        requireAdmin:true
    },
    {
        path:"/sales-manage/SalesAdd",
        component:SalesAdd,
    },
    {
        path:"/sales-manage/SalesList",
        component:SalesList,
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    },
    {
        path:"/news-manage/newsadd",
        component:NewsAdd,
        requireAdmin:true
    },
    {
        path:"/news-manage/newslist",
        component:NewsList,
        requireAdmin:true
    },
    {
        path:"/news-manage/editnews/:id",
        component:NewsEdit,
        requireAdmin:true
    },


]
export default routes