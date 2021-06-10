<template>

  <div class="dashboard">

    <el-header style="text-align: center" class="framework">
      <h1>智能云相册</h1>
    </el-header>

    <el-container  class="framework" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu > <!--# 默认打开的菜单-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i><span @click="toPublicSub">智能公共相册</span></template>
            <el-menu-item-group>
              <el-menu-item v-for="(a,b) in publiccategy" :key="a" :index="'1-'+b"><span @click="toPictureList(username,a,true)">{{a}}</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--待完成-->
          <el-submenu index="2">
            <template slot="title" ><i class="el-icon-menu"></i><span @click="toPrivateSub()">私人相册</span></template>
            <el-menu-item-group>
              <el-menu-item v-for="(a,b) in privatecategy" :key="a" :index="'1-'+b"><span @click="toPictureList(username,a,false)">{{a}}</span></el-menu-item>
            </el-menu-item-group>
            <!-- 通过axios获取有多少个分类 通过v-for来写-->
          </el-submenu>
          <!-- 待完成-->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-female"></i>照片智能检索</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">人脸照片检索</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--待完成-->
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-film"></i>智能剪辑</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">智能剪辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 10px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="addPic">添加照片</span></el-dropdown-item>
              <el-dropdown-item><router-link to="/logout">退出</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>你好,{{username}}</span>
        </el-header>

        <el-main class="body" id="main">
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
<!--  {{$route.params.username}}-->

  </div>
</template>


<script>
export default {
  name: 'DashBoard',
  data(){
      return{
        username: this.$route.params.username,
        publiccategy: [],
        privatecategy: [],
      }
  },
  methods: {
    toPrivateSub: function () {
      var vm = this;
      this.$router.push({name:"SubMain2", params:{username: vm.username, categy: vm.privatecategy}});
    },
    toPublicSub: function (){
      var vm = this;
      vm.$router.push({name:"SubMain1", params:{username: vm.username, categy:vm.publiccategy}});
    },
    toPictureList: function (username,categy,ispublic){
      this.$router.push({name:"PictureListWait",params:{username: username,categy:categy,ispublic:ispublic}});
    },
    addPic: function (){
      var vm = this;
      this.$router.push({name:"AddPic", params:{username: vm.username,categy: null, ispublic: true}});
      console.log("添加图片")
    }
  },
  created() {

    var vm=this;
    var address = '/api/categy?'+"username="+this.username+"&ispublic=false";
    this.axios({
      method: "get",
      url: address
    }).then(function (reps){
      vm.privatecategy = reps.data;

    });

    this.axios({
      method: "GET",
      url: '/api/categy?username=admin&ispublic=true'
    }).then(function (reps) {
      vm.publiccategy = reps.data;
      vm.$router.push({name:"SubMain1", params:{username: vm.username, categy:vm.publiccategy}});
    });


  }
};
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.dashboard{
  width: 100%;
  height: 90%;
  margin: auto;
}
.framework{
  height: 100%;
  width: 80%;
  margin: auto;
  border: 1px solid silver;
  border-radius: 5px;
}
.body{
  margin-left: 0px;
  background-color: #eeeeee;
  text-align: left;
}
#main{
  padding: 2px;
}

</style>
