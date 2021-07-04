<template>
    <div class="add-pic-dialog">
        <div class="add-pic-border">
            <div @click="closeDialog" class="closeImg"></div>
            <div class="add-wrapper">
                <div class="add-title">
                    <span>上传图片</span>
                     <el-button type="primary" class="btn-2" @click="fileClick">选择图片</el-button>
                </div>
                <ul class="categyform" >
                    <li class="categy-label">相册</li>
                    <li class="categy-input">
                      <el-select v-model="addcategy" placeholder="公共图册无需选择相册。">
                        <el-option value="公共相册"></el-option>
                        <el-option v-for="(value,key) in pricategy" :key="key" :value="value" :lable="value"></el-option>
                      </el-select>
                    </li>
                    <li class="categy-label">选中照片</li>
                    <li class="categy-input">
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
                      <span class="add-content">选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</span>
                    </li>
                    <li class="categy-label">评论</li>
                    <li  class="categy-input"><el-input type="textarea" placeholder="说点什么吧。" v-model="remark" :autosize="{minRows: 4,maxRows:4}"></el-input></li>
                </ul>
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display:none"/>
                <div class="categy-btn">
                <el-button class="button1" type="primary" @click="submitImg"><span class="iconfont">&#xe7dd;</span> 提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Addpic",
  data () {
    return {
      imgList: [],
      sendImgList: [],
      size: 0,
      addcategy: '',
      pricategy: this.GLOBAL.pricategy,
      remark: ''
    }
  },
  props:{
    ispublic:{
      type: Boolean,
      default: true
    },
    categy: {
      type: String,
      default:null,
    },
    username: {
      type: String
    }
  },
  methods: {
    pictureStruct(pic,mark){
      return{
        owner: this.username,
        categy: this.categy,
        b64: pic.src,
        ispublic: this.ispublic,
        picname: pic.name,
        persontag: null,
        ishuman: null,
        remark: mark,
      }
    },

    // 图片提交
    submitImg(){
      let vm = this;
      let files = this.imgList;
      let data1 = "[";
      for(var key in files){
        let pic = files[key].file;
        let struct = this.pictureStruct(pic,vm.remark);
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
      this.closeDialog();
    },

    //上传
    fileClick(){
      document.getElementById('upload_file').click();
    },

    fileChange(el){
      console.log(el);
      console.log(el.target.files[0]);
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
    },
    closeDialog(){
      this.imgList=[];
      this.sendImgList = [];
      this.size = 0;
      this.$emit('closeDialog', false);
    }
  },
  created(){
    if(this.ispublic)
      this.addcategy = '公共相册';
    else
      this.addcategy = this.categy;
  }
}
</script>

<style>
@import url('../css/loadpic.css');
.add-pic-dialog{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
}
.add-pic-dialog .add-pic-border{
    background-color: #F0F3F8;
    border-radius: 20px;
    position: absolute;
    width: 49%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.add-pic-dialog .closeImg{
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    background-image: url('../../static/icon/delete.png');
    /* 北京图片大小设置，不设置会导致图图片大小为原图大小 */
    background-size:cover;
    background-repeat: no-repeat;
}
.add-pic-dialog .add-wrapper{
    margin: 40px 20px 10px 20px;
    color: black !important;
    border: 1px solid #E4E9F3;
    text-align: left;
    background-color:#Fff;
  }
.add-pic-dialog .add-title{
    width:100%;
    height: 56px;
    background-color: #FAFAFA;
    padding: 12px 0;
    font-size: 22px;
    font-weight: 400;
    padding-left: 20px;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    color:#5C5E5D;
  }

 .categyform .categy-input{
    margin-bottom: 25px;
  }
  .categyform{
    padding: 20px 20px;
  }
  .categyform .categy-label{
    color:#495057;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .categyform input::-webkit-input-placeholder,.categyform textarea::-webkit-input-placeholder {
    color: #6C757D;
    font-size:15px;
  }

  .categyform input:focus,.categyform textarea:focus{
    border: 1px solid blue;
    box-shadow: 2px 2px 2px 2px #C1D8F3;
  }
  .categy-btn{
    padding: 0 20px;
  }
  .categy-btn .button1{
    background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
    /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); */
    margin-left: 0px;
    font-size: 17px;
    width: 100%;
    height: 45px;
    margin-bottom: 35px;
    margin-top: -10px;
    color:#6C757D;
    font-weight: 700;
  }
  .categy-btn .button1:hover{
    box-shadow: 3px 5px 0px 0px #E2E4EC;
    color:#495057;
  }
  .categy-btn .iconfont{
    font-size: 17px;
    vertical-align: -1px;
  }
.btn-2{
  float:right;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-right: 20px;
  margin-top: 2px;
  color: #fff;
}

.add-title button{
  height: 33px;
  padding: 6px 12px;
}
.add-content{
    width: 100%;
    font-size: 0.875rem;
    text-align: left;
    font-weight: 700!important;
    color: #6C757C;
    margin-top: 2px;
}

.categyform .upload_warp{
  margin: 0 20px 0 0;
  width: 100%;
  /* min-height: 100px; */
  max-height: 210px;
  overflow-y: auto;
  background-color: #fff;

}
.categyform .upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 25px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.categyform .upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.categyform .upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}
.categyform .upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
.categyform .upload_warp_img_div {
  position: relative;
  height: 98px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 5px 2px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}
.categyform .upload_warp_img {
  border-top: 1px solid #D2D2D2;
  overflow: hidden
}
.selected input {
  width: 100% !important;
}
</style>
