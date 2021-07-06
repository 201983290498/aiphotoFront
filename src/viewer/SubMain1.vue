<template>
    <div>
      <ul class="myul">
        <li v-for="ct in categy">
          <div @click="toPictureList(username,ct,true)">
            <i class="iconfont">&#xe609;</i>
            <span id = "font">{{ct}}</span>
          </div>
        </li>
    </ul>
    </div>
</template>

<script>
export default {
  name: "SubMain1",
  data(){
    return {
      username: this.$route.params.username,
      categy: this.$route.params.categy
    }
  },
  methods: {
    toPictureList: function (username,categy,ispublic){
      this.$router.push({name:"PictureListWait",params:{username: username,categy:categy,ispublic:ispublic}});
    }
  },
  created(){
    this.GLOBAL.ispublic = true;
  }

}
</script>

<style scoped>
@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');
.myul{
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
  cursor:pointer;
}
.myul li:hover #font{
  font-weight: 700 !important;
  color: black;
}
</style>
