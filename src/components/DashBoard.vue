<template>

  <div class="dashboard">
    <el-header class="header">
      <div class="title-wrapper">
        <div >
         <router-link to="/logout" class="title">AIPhoto</router-link>
        </div>
        <div class="function-wrapper">
          <div class="function-list">
            <button class="titlebtn" @click="GlobalList">    
              <el-dropdown placement="bottom-start">
                <i class="iconfont search_list" >&#xe6a0;</i> 
                <el-dropdown-menu> 
                  <el-dropdown-item class="menuitem1"  v-if="this.GLOBAL.pripassword" @click="globalClassify('人物')">人物</el-dropdown-item>
                  <el-dropdown-item class="menuitem1"  v-if="this.GLOBAL.pripassword" @click="globalClassify('交通工具')">交通工具</el-dropdown-item>
                  <el-dropdown-item class="menuitem1"  v-if="this.GLOBAL.pripassword" @click="globalClassify('自然风景')">自然风景</el-dropdown-item>
                  <el-dropdown-item class="menuitem1"  v-if="this.GLOBAL.pripassword" @click="globalClassify('建筑')">建筑</el-dropdown-item>
                  <el-dropdown-item class="menuitem1"  v-if="this.GLOBAL.pripassword" @click="globalClassify('动物')">动物</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> 
            </button>
            <button class="titlebtn" @click="enterDeleteStatu(2)"><i class="iconfont">&#xe6c6;</i></button>
            <button class="titlebtn" @click="enterDeleteStatu(3)"><i class="iconfont">&#xea16;</i></button>          
          </div>
          <div class="others clearlfix">
            <button class="titlebtn"><i class="far fa fa-language"></i></button>
            <button class="user  userbtn"><i class="far fa fa-user-circle icon1"></i>{{username}}
            <el-dropdown>
              <i class="fa fa-fw fa-angle-down icon2"></i>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="menuitem1"><i class="icon3 far fa-fw fa-user"></i><span @click="addPic">添加照片</span></el-dropdown-item>
              <el-dropdown-item class="menuitem1"><i class="icon3 far fa-fw fa-arrow-alt-circle-left"></i><router-link to="/logout">退出</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </button>
          </div>
          <AddPic v-if="openAdd" :username="username"  @closeDialog="closeAddDialog"></AddPic>
        </div>
      </div>
    </el-header>
    <el-container  class="container">
      <div class="framework">
      <el-aside class="side">
        <el-menu > <!--# 默认打开的菜单-->
          <el-submenu index="1">
            <template slot="title" class="menuitem2"><span  @click="toPublicSub"><i class="iconfont icon">&#xedee;</i>智能公共相册</span></template>
            <el-menu-item-group>
              <el-menu-item v-for="(a,b) in publiccategy" :key="a" :index="'1-'+b"  @click="toPictureList(username,a,true)"  class="menuitem2"> 
                <i v-if="a=='人物'" class="iconfont icon">&#xe747;</i>
                <i v-if="a=='建筑'" class="iconfont icon">&#xe6bc;</i>
                <i v-if="a=='交通工具'" class="iconfont icon">&#xe62e;</i>
                <i v-if="a=='others'" class="iconfont icon">&#xe62c;</i>
                <i v-if="a=='自然风景'" class="iconfont icon">&#xf51a;</i>
                <i v-if="a=='动物'" class="iconfont icon">&#xe602;</i>
                <span>{{a}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--待完成-->
          <el-submenu index="2">
            <template slot="title"    class="menuitem2"><span @click="tocheck2()"><i class="iconfont icon" >&#xe603;</i>私人相册</span></template>
            <el-menu-item-group v-if="this.GLOBAL.pripassword">
              <el-menu-item v-for="(a,b) in privatecategy" :key="a" :index="'1-'+b"  @click="toPictureList(username,a,false)" class="menuitem2"> <i class="iconfont  icon">&#xe62c;</i> <span >{{a}}</span></el-menu-item>
            </el-menu-item-group>
            <!-- 通过axios获取有多少个分类 通过v-for来写-->
          </el-submenu>
        </el-menu>
      </el-aside>
      </div>
      <el-container>
        <el-main class="body" id="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
<!-- 添加用户的对话框 -->
  </div>
</template>


<script>
import AddPic from '../dialog/AddPic.vue'
export default {
  name: 'DashBoard',
  data(){
    return{
      username: this.$route.params.username,
      publiccategy: [],
      privatecategy: [],
      list: [],
      openAdd: false,
      indexStatus: 1,
      searchList: false,
      categy: '',
    }
  },
  components:{
    AddPic
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
      console.log("添加图片");
      this.openAdd = true;
    },
    closeAddDialog(flag){
      this.openAdd = flag;
    },
    tocheck2:function(){
      var vm = this;
      if (this.GLOBAL.pripassword==false)
        this.$router.push({name: "Check2", params:{username: vm.username,categy: vm.privatecategy}});
      else{
        this.toPrivateSub();
      }
    },
    enterDeleteStatu(index){
      if(this.indexStatus!=index){
        this.indexStatus  = index;
        this.GLOBAL.deleteList = [];
        this.GLOBAL.deleteStatus = false;
        // map的遍历
        for(let key of this.GLOBAL.deleteMap){
          this.GLOBAL.deleteMap.set(key[0],'delete');
        }
      }
      let vm = this;
      if(index==3){
        if(!this.GLOBAL.deleteStatus){
          vm.$message.info("请选择需要删除的图片");
          this.GLOBAL.deleteStatus = true;
          this.GLOBAL.downStatus = false;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.GLOBAL.categy,ispublic:vm.GLOBAL.ispublic}});
        }
        else{
          this.GLOBAL.showList = true;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.GLOBAL.categy,ispublic:vm.GLOBAL.ispublic}});
        }
      }else if(index == 2){
        if(!this.GLOBAL.deleteStatus){
          vm.$message.info("请选择需要下载的图片");
          this.GLOBAL.deleteStatus = true;
          this.GLOBAL.downStatus = true;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.GLOBAL.categy,ispublic:vm.GLOBAL.ispublic}});
        }
        else{
          this.GLOBAL.showList = true;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.GLOBAL.categy,ispublic:vm.GLOBAL.ispublic}});
        }
      }else if(index == 1){
        if(!this.GLOBAL.deleteStatus){
          vm.$message.info("全局搜索"+this.categy+"类图片");
          this.GLOBAL.deleteStatus = true;
          this.GLOBAL.downStatus = true;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.categy,ispublic:false}});
        }else{
          this.GLOBAL.showList = true;
          this.$router.push({name:"PictureListWait",params:{username: vm.GLOBAL.username,categy:vm.GLOBAL.categy,ispublic:vm.GLOBAL.ispublic}});
        }
      }
    },
    GlobalList(){
      if(!this.GLOBAL.pripassword){
        this.tocheck2();
      }else{
        this.searchList = true;
      }
    },
    globalClassify(categy1){
      let vm = this;
      vm.categy = categy1;
      this.GLOBAL.globalSearch =true;
      console.log(categy1);
      this.enterDeleteStatu(1);
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
      vm.GLOBAL.pricategy = reps.data;
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
  width: 300px ;
}
.title-wrapper{
  height: 80px ;
  line-height: 80px ;
}
.title{
  width: 300px ;
  padding: 0 18px ;
  background-color:#1F75D5;
  font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  font-weight: 400;
  font-size: 25px;
  color: #C7DCF4;
  padding-left: 8px;
  float: left;
}
.header{
  padding: 0px ;
  height: 80px !important;
  line-height: 80px;
  width:100%; 
  background-color:#0665D0;
}
.title:hover{
  text-decoration: underline;
  color: #fff;
}

.titlebtn{
  margin-right: 4px;
  padding: 0px 18px;
  height: 46px;
  margin-top: 18px;
  border: #fff;
  border-radius: 4px;
  background-color: #0770E6;
  font-weight: 900 ;
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
    font-weight: 900 ;
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
.menuitem1{
  margin: 0px;
  font-size: 18px;
  color:#495057;
}
.icon3:hover{
  background-color: #F0F3F8;
}
icon3{
  margin-right: 6px;
}


.framework{
  width: 300px;
  height: 803px;
  background-color: #fff;
  text-align: left ;
}

.menuitem2{
  font-size: 18px;
  color:#495057;
  margin: 0 25px;
  margin-bottom: 2px;
  padding: 0px 0px !important;
}
.menuitem2:visited{
  color: red;
}
.icon{
  font-size: 23px ;
  margin-right: 8px;
  color:#5093DE !important;
  font-weight: 400;
}
#main{
 width: 100%;
 height: 100%;

 padding: 10px 20px;
}
.container{
  width:100%;
  margin-left: 0;
  padding-left: 0;
  background-color: #F0F3F8;
}
.function-list{
  float: left;
  padding-left: 28px;
}
.others{
  float: right;
  padding-right: 28px;
}
.search_list{
  color: #F0F3F8;
}

</style>
