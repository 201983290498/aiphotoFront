<template>
  <div>
    <div class="img" >
      <div class="upload">
        <div class="upload_warp_left" @click="fileClick" >
          <Button icon="ios-cloud-upload-outline" class="btn btn-success">上传图片</Button>
        </div>
        <div class="upload_warp_text">
          选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
        </div>
        <div class="upload_warp" style="border: 1px solid #ffffff;">
          <div class="upload_warp_img" v-show="imgList.length!=0" >
            <div class="upload_warp_img_div" v-for="(item,index) in imgList">
              <div class="upload_warp_img_div_top" >
                <div class="upload_warp_img_div_text" >
                  {{item.file.name}}
                </div>
                <img src="/static/icon/delete.png" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <img :src="item.file.src">
            </div>
          </div>
        </div>
        <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
      </div>
    </div>
    <div>
      <Button type="primary" @click="submitImg">提交</Button>
    </div>
  </div>
</template>

<script>
import PictureList from "../viewer/PictureList";

export default {
  name: "Addpic",
  data () {
    return {
      imgList: [],
      sendImgList: [],
      username: this.$route.params.username,
      ispublic: this.$route.params.ispublic,
      categy: this.$route.params.categy,
      size: 0
    }
  },

  methods: {
    pictureStruct(pic){
      return{
        owner: this.username,
        categy: this.categy,
        b64: pic.src,
        ispublic: this.ispublic,
        picname: pic.name,
        persontag: null,
        ishuman: null,
      }
    },

    // 图片提交
    submitImg(){
      let vm = this;
      let files = this.imgList;
      let data1 = "[";
      for(var key in files){
        let pic = files[key].file;
        let struct = this.pictureStruct(pic);
        data1  = data1 + JSON.stringify(struct) + ",";
      }
      data1 = data1.substr(0,data1.length-1) + "]";
      vm.$message.info("正在上传"+files.length+"张图片");
      this.axios({
        method: 'post',
        data: JSON.parse(data1),
        url: '/api/b64pictures/addlist',
      })
        .then((res)=> {
          vm.$message.success("成功上传"+res.data+"张图片");
          this.$router.push({name:"PictureListWait",params:{username: this.username,categy:this.categy,ispublic:this.ispublic}});
        }).catch((error) =>{})
      this.$router.push({name:"PictureListWait",params:{username: this.username,categy:this.categy,ispublic:this.ispublic}});
    },

    //上传
    fileClick(){
      document.getElementById('upload_file').click()
    },

    fileChange(el){
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = ''
    },

    fileList(files){
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },

    fileAdd(file) {
      this.size = this.size + file.size;//总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.imgList.push({
          file
         });
      }
    },

    fileDel(index){
      this.size = this.size - this.imgList[index].file.size;//总大小
      this.imgList.splice(index, 1);
    },

    bytesToSize(bytes){
      if (bytes === 0) return '0 B';
      let k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
  }
}
</script>

<style>
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 5px 5px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #D2D2D2;
  padding: 5px 0 0 5px;
  overflow: hidden
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 5px;
  padding-top: 5px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_left button {
  margin: 1px 5px 0px 0px;
  cursor:pointer;
}

.upload_warp_left {
  float: left;
}

.upload_warp_left .btn-success{
  background: rgb(45, 140, 240);
  color:#fff;
}

.upload_warp {
  margin: 5px;
}

.upload {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: #fff;
  width: 770px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.img {
  width: 770px;
  text-align: center;
}

</style>
