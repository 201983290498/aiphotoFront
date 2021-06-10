import Vue from 'vue'
//导入路由插件
import Router from 'vue-router'
//导入要用到的组件
import Login from '../components/Login'

import ProduceInfo from "../test/ProduceInfo"
import ProduceList from "../test/ProductList"
import AddPic from "../components/AddPic";
import OnePictureShow from "../viewer/OnePictureShow";

//安装路由
Vue.use(Router);




//配置路由
export default new Router({
  routes: [

    {
      path: '/',
      name: 'Login',
      component: Login
    },//下面是重定向
    {
      path: '/logout',
      redirect: '/'
    },
    {
      path: '/register',
      name: 'Register',
      component: () =>import('../components/Register')
    },
    {
      path: '/pictureshow/:id/:username',
      name: 'OnePictureShow',
      component: ()=>import('../viewer/OnePictureShow')
    },
    {
      path: '/dashboard/:username',
      name: 'DashBoard',
      component: ()=>import('../components/DashBoard'),
      children: [
        {
          path: "/addpic",
          name: "AddPic",
          component: AddPic
        },
        {
          path: '/submain1',
          name: "SubMain1",
          component: ()=>import('../viewer/SubMain1')
        },
        {
          path: '/submain2',
          name: 'SubMain2',
          component: ()=>import('../viewer/SubMain2')
        },
        {
          path: '/pictureList',
          name: 'PictureList',
          component: ()=>import("../viewer/PictureList")
        },
        {//pictureList的中间转换路由
          path: '/pictureListWait',
          name: 'PictureListWait',
          component: ()=>import("../viewer/PictureListWait")
        }
      ]
    }

    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: () => import('../viewer/Home'),
    //   children: [
    //     {
    //       path: '/productlist',
    //       name: 'ProductList',
    //       component: ProduceList
    //     },
    //     {
    //       path:'/',
    //       redirect: '/productlist'
    //     },
    //     {
    //       path: '/productinfo',
    //       name: 'ProductList',
    //       component: ProduceInfo
    //     }
    //   ]
    // }
  ]
})
