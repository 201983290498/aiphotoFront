<template>
  <div>
    
    <ul class="myul">
      <li @click="createDialog">
        <div>
          <i class="iconfont">&#xe8f3;</i>
          <span id = "font">新建</span>
        </div>
      </li>
      <li v-for="ct in categy">
        <span @click="toPictureList(username,ct,false)">
          <i class="iconfont">&#xe609;</i>
          <span id = "font">{{ct}}</span>
        </span>
      </li>
    </ul>
    <AddCategy  @closeDialog='closeDialog' v-if="showDialog" :username="username"></AddCategy>

  </div>
</template>

<script>

import AddCategy from '../dialog/AddCategy';

export default {

  name: "SubMain2",
  components: {
    'AddCategy':AddCategy 
  },
  data(){
    return {
      username: this.$route.params.username,
      categy: this.$route.params.categy,
      showDialog: false
    }
  },
  methods: {
    toPictureList: function (username,categy,ispublic){
      this.$router.push({name:"PictureListWait",params:{username: username,categy:categy,ispublic:ispublic}});
    },
    createDialog: function(){
      this.showDialog = true;
    },
    closeDialog: function(imgcategy){
      this.showDialog = false;
    }
  },
  created(){

  }
}

</script>

<style scoped>


@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');
.myul{
  padding: 3px;
  list-style-type: none;
  overflow: hidden;
}

.myul li{
  width: 100px;
  height: 115px;
  float:left;
  margin: 8px 16px;
  border-radius: 4px;
  border: solid 1px #E4E9F3;
  background-color: #EaEaEa;
}
.myul i{
  font-size: 65px;
  display: block;
  height: 80px;
}
#font{
  display: inline-block;
  padding: 0px;
  font-size: 18px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  color: #6C757C;
}
.myul li:hover{
  background-color: #fff;
  box-shadow:  #E2E8F2 1px 0px 1px 1px;
}
.myul li:hover #font{
  font-weight: 700 !important;
  color: black;
}
</style>