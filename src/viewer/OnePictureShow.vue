<template>
  <div id="main">
    <span class="upload_warp_img_div">
      <img :src="src" >
    </span>
  </div>
</template>

<script>
export default {
  name: "OnePictureShow",
  data() {
    return{
      username: null,
      pictureId: null,
      src: null
    }
  },
  created() {
    this.pictureId = this.$route.params.id;
    this.username = this.$route.params.username;
    let vm = this;
    let address = '/api/b64picture?username='+this.username +'&id=' + this.pictureId;
    this.axios({
      method: "get",
      url: address
    }).then(function (rep){
      console.log(rep.data);
      vm.src = rep.data.b64;
    });
  }
}
</script>

<style scoped>
#main{
  width: 80%;
  height: 100%;
  margin: 0px auto;
  background-color: #999999;
  vertical-align: center;
  line-height:700px;
}
#main img {
  max-height: 100%;
  max-width: 100%;
  margin: 0px auto;
}
</style>
