<template>

  <div>
    <ul class="myul">
      <li v-for="ct in categy">
        <span @click="toPictureList(username,ct,false)">
          <img src="static\icon\fileIcon.png" alt="文件图片">
          <span id = "font">{{ct}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SubMain2",
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

  }
}

</script>

<style scoped>
.myul{
  padding: 3px;
  list-style-type: none;
  overflow: hidden;
}

.myul li{
  width: 100px;
  height: 120px;
  float: left;
  display: inline-block;
  margin: 10px 30px;
}
.myul img{
  width: 100%;
  height: 100px;
}
#font{
  /* display: inline-block; */
  padding: 0px;
  font-size: 18px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: auto;
}
</style>
