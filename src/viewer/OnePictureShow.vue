<template>
  <div>
  <div id="main" @click="closeDialog">
    <span class="upload_warp_img_div1">
      <img :src="picture.b64" >
    </span>
  </div>
  <div class="download-icon-wrapper" @click="downLoad"><i class="iconfont download-icon">&#xe662;</i></div>    
  </div>
</template>

<script>
export default {
  name: "OnePictureShow",
  data() {
    return{
      downfile: false
    }
  },
  props: {
    picture: {
      type: Object
    }
  },
  methods: {
    closeDialog(){
      if(!this.downfile)
        this.$emit('closeDialog', false);
    },
    downLoad(){
      let vm = this;
      vm.downfile = true;
      this.$emit("downLoad", vm.picture);
      vm.downfile = false;
    }
  }
}
</script>

<style scoped>
#main{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);

}
.upload_warp_img_div1>img{  
  z-index: 999;
  max-height:80%;
  max-width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background:#F0F3F8;
}

.download-icon-wrapper{
  z-index: 1;
  position: absolute;
  bottom: 40px;
  right: 60px;
}
.download-icon{
  font-size: 54px;
  color: #6CCBFF;
  cursor:pointer;
}
.download-icon:hover{
  color:#0260FF;
  text-shadow: 2px 2px 2px 2px #ccc;
}
</style>
