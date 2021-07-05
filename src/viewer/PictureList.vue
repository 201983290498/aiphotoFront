<template>
  <div>
    <div class=" div-height" >
      <Button icon="ios-cloud-upload-outline" class="btn success text1 btn1" @click="deleteStatus">删除图片</Button>
      <Button icon="ios-cloud-upload-outline" class="btn success btn2 text2"  @click="quitDelete">取消删除</Button>
      <Button icon="ios-cloud-upload-outline" class="btn success text1 btn2" @click="comDelete">确认删除</Button>
      <Button icon="ios-cloud-upload-outline" class="face btn success" id="face1" @click="faceRecog" v-if="!ispublic||(categy=='人物')">人脸聚合</Button>
      <Button icon="ios-cloud-upload-outline" class="face btn success" id="face3" @click="comRecog(0)">取&nbsp;&nbsp;消</Button>
      <Button icon="ios-cloud-upload-outline" class="face btn success" id="face2" @click="comRecog(1)" >确认聚合</Button>
    </div>
    <div class="piclists clearfix">
      <div class="piclist list1 clearfix">
        <ul class="myul1" >
          <div v-for="(picurl,index) in pictureList" :key="index">
            <li v-if="index%4==0" class="div">
                <div class="top">
                  <div class="text" >
                    {{picurl.picname}}
                  </div>
                  <img src="/static/icon/delete.png" class="del" :id="'pic'+picurl.id" @click="deletePic(picurl.id)">
                </div>
                <Pic :picture="picurl" :createDialog="createDialog"></Pic>
            </li>
          </div>
          <!-- <li v-if="(!finished)" ><LoadWait class="wait"></LoadWait></li> -->
        </ul>
      </div>
      <div class="piclist list2 clearfix">
        <ul class="myul1" >
          <div v-for="(picurl,index) in pictureList" :key="index">
            <li v-if="index%4==1" class="div">
                <div class="top">
                  <div class="text" >
                    {{picurl.picname}}
                  </div>
                  <img src="/static/icon/delete.png" class="del" :id="'pic'+picurl.id" @click="deletePic(picurl.id)">
                </div>
                <Pic :picture="picurl" :createDialog="createDialog"></Pic>
            </li>
          </div>
          <!-- <li v-if="(!finished)&&(index%4==1)" ><LoadWait class="wait"></LoadWait></li> -->
        </ul>
      </div>
      <div class="piclist list3 clearfix">
        <ul class="myul1" >
          <div v-for="(picurl,index) in pictureList" :key="index">
            <li v-if="index%4==2" class="div">
                <div class="top">
                  <div class="text" >
                    {{picurl.picname}}
                  </div>
                  <img src="/static/icon/delete.png" class="del" :id="'pic'+picurl.id" @click="deletePic(picurl.id)">
                </div>
                <Pic :picture="picurl" :createDialog="createDialog"></Pic>
            </li>
          </div>
          <!-- <li v-if="(!finished)&&(index%4==2)" ><LoadWait class="wait"></LoadWait></li> -->
        </ul>
      </div>
      <div class="piclist list4 clearfix">
        <ul class="myul1" >
          <div v-for="(picurl,index) in pictureList" :key="index">
            <li v-if="index%4==3" class="div">
                <div class="top">
                  <div class="text" >
                    {{picurl.picname}}
                  </div>
                  <img src="/static/icon/delete.png" class="del" :id="'pic'+picurl.id" @click="deletePic(picurl.id)">
                </div>
                <Pic :picture="picurl" :createDialog="createDialog"></Pic>
            </li>
          </div>

        </ul>
      </div>
    </div>
    <div class="add-icon-wrapper" @click="addPic" v-if="!show_Pic"><i class="iconfont add-icon">&#xe604;</i></div>
    <OnePictureShow v-if="show_Pic" :picture="picExample" @closeDialog="closeDialog" @downLoad="downLoadPic"></OnePictureShow>
    <AddPic v-if="openAdd" :username="username" :categy="categy" :ispublic="ispublic" @closeDialog="closeAddDialog"></AddPic>
  </div>
</template>

<script>
import LoadWait from '../dialog/LoadWait.vue'
import OnePictureShow from './OnePictureShow'
import AddPic from '../dialog/AddPic'
import Pic from '../dialog/Pic'
export default {
  name: "PictureList",
  components: {
    LoadWait,
    OnePictureShow,
    AddPic,
    Pic
  },
  data() {
    return {
      username: this.$route.params.username,
      categy: this.$route.params.categy,
      ispublic: this.$route.params.ispublic,
      deletelist:[],
      pictureList: [],
      ids: [],
      finished: false,
      show_Pic: false,
      picExample: null,
      openAdd: false
    }
  },
  methods: {
    getPic: function (){
      let username= this.$route.params.username;
      let categy = this.$route.params.categy;
      let ispublic = this.$route.params.ispublic;
      let vm = this;
      let add = "/api/b64pictures?username="+username+ "&categy=" + categy + "&ispublic=" + ispublic;
      vm.axios({
        method: 'get',
        url: add
      }).then(function(resp){
        vm.ids = resp.data;
        add = "/api/b64picture?username="+username+ "&id=";
        if(resp.data.length==0)
          vm.finished = true;
        //重新定义
        if(vm.GLOBAL.pictureList.length==0){
          vm.GLOBAL.pictureList = new Map();
        }
        for(let i=0;i<vm.ids.length;i++){
          let id = vm.ids[i];
          vm.getPicById(add,id);
          if(i==vm.ids.length-1)
            vm.finished = true;
        }
      });
    },

    getPicById: function(add,id){
      let vm = this;
      if(vm.GLOBAL.pictureList.has(id)){
        vm.pictureList.push(vm.GLOBAL.pictureList.get(id));
        return;
      }
      //不存在，从服务器请求
      let tem_add = add + id;
      vm.axios({
        method: 'get',
        url: tem_add
      }).then(function(rep){
        vm.pictureList.push(rep.data);
        //添加到全局变量中
        vm.GLOBAL.pictureList.set(id,rep.data);
      });
    },
    changeBtn: function (sty1,sty2){
      var btns = document.getElementsByClassName("btn1");
      for (let i = 0;i<btns.length;i++) {
        btns[i].style.display = sty1;
      }
      btns = document.getElementsByClassName("btn2");
      for (let i = 0;i<btns.length;i++)
        btns[i].style.display = sty2;
    },

    showFloatText: function (sty){
      var top =  document.getElementsByClassName("top");
      for (let i = 0;i<top.length;i++)
        top[i].style.display = sty;
    },

    deleteStatus: function (){
      //显示操作栏
      this.showFloatText("inline");
      this.changeBtn("none","inline")
      this.deletelist = [];
    },

    changeIcon: function (Id){
      let icon = document.getElementById("pic"+Id);
      if(icon.getAttribute("src")=="/static/icon/delete.png")
          icon.setAttribute("src", "/static/icon/confirm.png") ;
      else
        icon.setAttribute("src", "/static/icon/delete.png");
    },

    quitDelete: function (){
      for(let i=0;i<this.deletelist.length;i++){
        this.changeIcon(this.deletelist[i]);
      }
      this.showFloatText("none");
      this.changeBtn("inline","none");
      this.deletelist= [];
    },

    deletePic: function (picId) {
      console.log(this.deletelist);
      //在列表中查找元素
      let index = this.deletelist.indexOf(picId);
      if ( index < 0) {
        this.deletelist.push(picId);
        this.changeIcon(picId);
      }else{
        //已经存在了，继续点就是删除某个元素
        this.deletelist.splice(index,index+1);
        this.changeIcon(picId);
      }
    },
    comDelete: function (){
      /**
       * 因为是根据id找的标签，所以不同的图片可能有相同的标签，为了方便，我们先把标签变回来，然后删除图片。
       * @type {default.methods}
       */
      let vm = this;
      for(let i=0;i<this.deletelist.length;i++){
        this.changeIcon(this.deletelist[i]);
      }
      this.showFloatText("none");
      this.changeBtn("inline","none");
      this.axios({
        method: "post",
        data: vm.deletelist,
        url: '/api/b64pictures/delete'
      }).then(function (reps){
        vm.$message.success("成功删除"+reps.data+"张图片");
      });
      this.$router.push({name:"PictureListWait",params:{username: this.username,categy:this.categy,ispublic:this.ispublic}});
      this.deletelist = [];
    },
    faceRecog: function (){
      this.$message.info("请选择一张图片");
      if(!(this.categy=="人物")&&this.ispublic){
        this.$message.warning("当前分类无法聚合");
      }else{
        this.changeBtn("none","none");
        document.getElementById("face1").style.display = "none";
        document.getElementById("face2").style.display = "inline";
        document.getElementById("face3").style.display = "inline";
        this.showFloatText("inline");
        this.deletelist = [];
      }
    },
    comRecog:function (flag){
      this.showFloatText("none");
      document.getElementById("face1").style.display = "inline";
      document.getElementById("face2").style.display = "none";
      document.getElementById("face3").style.display = "none";
      this.changeBtn("inline","none");
      for(let i=0;i<this.deletelist.length;i++){
        this.changeIcon(this.deletelist[i]);
      }
      if(flag == 1){
        console.log("进行人脸聚合");
        if(this.deletelist.length!=1)
          this.$message.warning("所选图片图片的数量不正确");
        else{
          let vm = this;
          let add = '/api/face/collections?id='+vm.deletelist[0];
          this.axios({
            method: 'get',
            url: add
          }).then(function (reps){
            if(reps.data.length == 0)
              vm.$message.warning("聚合失败");
            else {
              vm.ids = reps.data;
              vm.pictureList = [];
              let add = "/api/b64picture?username="+username+ "&id=";
              for(let i=0;i<vm.ids.length;i++){
                let id = vm.ids[i];
                vm.getPicById(add,id)
              }
              vm.$message.success("聚合成功");
            }
          });
        }
      }
      this.deletelist = [];
    },
    downLoadPics: function(){
      let vm = this;
      let pics = this.GLOBAL.pictureList;
      for(let i=0;i<this.deletelist.length;i++){
        vm.downLoadPic(pics.get(vm.deletelist[i]));
      }
      //回复到默认状态
      this.quitDelete();
    },
    // 下载单张图片
    downLoadPic: function(picture){
      let a = document.createElement('a');
      let event = new MouseEvent('click');
      a.download = picture.picname;
      a.href = picture.b64;
      a.dispatchEvent(event);
    },
    createDialog: function(pic){
      let vm = this;
      vm.show_Pic = true;
      vm.picExample = pic;
    },
    closeDialog: function(flag){
      this.show_Pic = flag;
    },
    addPic(){
      this.openAdd = true;
    },
    closeAddDialog(flag){
      this.openAdd = false;
    }
  },
  created(){
    this.getPic();

  }
}
</script>

<style scoped>
.div-height {
  width:100%;
  height:35px;
  background-color: #F0F3F8;
}
.success{
  background: rgb(45, 140, 240);
  color:#fff;
  padding: 5px 10px ;
  font-size: 18px;
  height: 35px;
}
.myul1{
  list-style-type: none;
  background-color: aqua;
  padding: 0px;

}
.myul1 li{
  width: 100%;
  float: left;
  margin-top: 6px;
  border: 2px solid #ccc;
  background-color: #eee;
  /* position: relative; */
}
.myul1 img{
  max-width: 100%;
  max-height: 100%;
}
.div {
  width: 100%;
  position: relative;
}

.top {
  display: none;
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
  z-index:2;
}
.text{
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.del{
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}
.text1{
  margin-left: 30px;
  background-image: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
}
.btn1{
  display: inline;
  margin-left: 0;
  float: left;
}
.btn2{
  display: none;
  float: left;
}
.text2{
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.face{
  display: inline;
  float: right;
  margin-right: 40px;
  background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}
#face2,#face3{
  display: none;
}
.add-icon-wrapper{
  position: absolute;
  bottom: 40px;
  right: 60px;
}
.add-icon{
  font-size: 54px;
  color: #00CC99;
  cursor:pointer;
}
.add-icon:hover{
  color: #02D8A3;
  text-shadow: 2px 2px 2px 2px #ccc;
}
.wait {
  padding: 20px 0px;
}
.btn{
  color: #C7DCF4;
  font-weight: 700;
}
.btn:hover{
  color: #fff;
}
#face3{
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.piclists{
  width: 1126px;
  height: 640px;
  overflow: auto;
  padding-top: 15px;
}
.piclist{
  width: 257px;
  float: left;
  margin-left: 5px;
  height: 100%;
}
.piclist li:hover{
  box-shadow: 2px 2px 2px 2px #AAAAAA;
}

.list1{
  margin-left: 10px;
  background-color: red;
}
.list2{
  background-color: blue;
}
.list3{
  background-color: yellow;
}
.list4{
  background-color: green;
}
</style>
