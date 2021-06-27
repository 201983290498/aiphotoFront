<template>

  <div class="dashboard">
    <el-header class="header">
      <div class="title-wrapper">
        <div class="title">
          AIPhoto
        </div>
        <div class="function-wrapper">
          <ul class="function-list">
            <li class="function"> </li>
          </ul>
          <div class="others clearlfix">
            <button class="titlebtn"><i class="far fa fa-language"></i></button>
            <button class="user  userbtn"><i class="far fa fa-user-circle icon1"></i>{{username}}
            <el-dropdown>
              <i class="fa fa-fw fa-angle-down icon2"></i>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="menuitem"><i class="icon3 far fa-fw fa-user"></i><span @click="addPic">添加照片</span></el-dropdown-item>
              <el-dropdown-item class="menuitem"><i class="icon3 far fa-fw fa-arrow-alt-circle-left"></i><router-link to="/logout">退出</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </button>
 
          </div>
          
        </div>
      </div>
      <div class="function_wrapper"></div>
    </el-header>
    <el-container  class="framework" >
      <el-aside class="side">
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
@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');
.side{
  width: 250px !important;
}
.title-wrapper{
  height: 80px !important;
  line-height: 80px !important;
}
.title{
  width: 250px !important;
  padding: 0 18px !important;
  background-color:#1F75D5;
  font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  font-weight: 400;
  font-size: 25px;
  color: #C7DCF4;
  padding-left: 8px;
  float: left;
}
.header{
  padding: 0px !important;
  height: 80px !important;
  line-height: 80px !important;
  width:100%; 
  background-color:#0665D0;
}
.title:hover{
  text-decoration: underline;
  color: #fff;
}
.others{
  float: right;
  padding-right: 28px;
}

.titlebtn{
    margin-right: 4px;
    padding: 0px 18px;
    height: 46px;
    margin-top: 18px;
    border: #fff;
    border-radius: 4px;
    background-color: #0770E6;
    font-weight: 900 !important;
    font-size: 18px;
    color:#fff;
}
.userbtn{
    margin-right: 4px;
    height: 46px;
    margin-top: 18px;
    border: #fff;
    border-radius: 4px;
    background-color: #0770E6;
    font-weight: 900 !important;
    font-size: 18px;
    color:#fff;
    padding: 0 14px 0 18px;
}
.titlebtn:hover,.userbtn:hover{
  background-color:#0557B2;
}
.icon1{
  margin-right: 4px;
}
.icon2{
  padding: 0 4px;
  display: inline-block;
}
.drawMenu{
  widows: 100px;
  height: 200px;
  overflow: hidden;
}
.menuitem{
  width: 176px;
  padding: 6px 12px;
  margin: 0px 12px;
  font-size: 18px;
  color:#495057;
}
.icon3:hover{
  background-color: #F0F3F8;
}
icon3{
  margin-right: 6px;
}
.side{
  height: 100% !important;
}
</style>
