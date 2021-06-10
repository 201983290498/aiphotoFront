<template>
  <div>
<!--    总的页面是一个容器-->
    <el-container style="height: 500px; border: 1px solid red">
<!--     边框栏-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
<!--        添加菜单，选择默认打开的菜单-->
        <el-menu :default-openeds="['1', '3']"><!--默认打开的导航栏-->
<!--          子菜单+index-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>商品列表</template>
            <el-menu-item-group>
<!--              <template slot="title">分组一</template>-->
              <el-menu-item index="1-1"><router-link to="/productlist">商品列表</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link to="/productInfo">商品信息</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--    加上菜单的主体-->
      <el-container>
        <!--        设置正常表单的表单头-->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <!--            设置按钮-->
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <!--            下拉菜单-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item><router-link to="/logout">退出</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--          用户名-->
          <span>王小虎</span>
        </el-header>
        <!--表单主题-->
        <router-view></router-view>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
  },
  created() {
    var vm = this;
    this.axios({
      method: "get",
      url: "https://mock.mengxuegu.com/mock/606993ede34b2e50a355ca6d/vue/users"
      }).then(function (rep){
        console.log(rep.data.users);
        console.log("success")
        vm.user = rep.data.users;
    });
  },
  methods: {
    Logout: function (){
      this.$router.push('/logout');
    }
  },
  beforeRouteEnter(to, from ,next){
    console.log("进入页面");
    next();
  },
  beforeRouteLeave(to,from,next){
    console.log('离开页面');
    next();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
