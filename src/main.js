// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入VueAxois
import VueAxios from "vue-axios"
import axios from 'axios'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios,axios);//使用axios模块
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',//等价于下面的式子
  // render: h => h(App),
  router
})
