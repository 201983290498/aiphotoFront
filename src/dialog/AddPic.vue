<template>
    <div class="add-pic-dialog">
        <div class="add-pic-border">
            <div @click="closeDialog" class="closeImg"></div>
            <div class="add-wrapper">
                <div class="add-title">
                    <span>上传图片</span>
                     <el-button type="primary" class="btn-2"><span class="iconfont">&#xe7dd;</span> 创建</el-button>
                </div>
                <ul class="categyform" :model="imgcategy">
                    <li class="categy-label">相册名称</li>
                    <li ><el-input placeholder="请输入分类名称"  class="categy-input"></el-input></li>
                    <li class="categy-label">相册描述</li>
                    <li ><el-input type="textarea" placeholder="相册的简单描述...(300字以内。)"  class="categy-input" :autosize="{minRows: 6,maxRows:6}"></el-input></li>
                </ul>
                <div class="categy-btn">
                <el-button class="button1" type="primary" @click="onSubmit"><span class="iconfont">&#xe7dd;</span> 创建</el-button>
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
      size: 0
    }
  },
  props:{
    ispublic: Boolean,
    categy: String,
    username: String,
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
        let struct = this.pictureStruct(pic,null);
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
  }
}
</script>

<style>
.add-pic-dialog{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
}
.add-pic-border{
    background-color: #F0F3F8;
    border-radius: 20px;
    position: absolute;
    width: 55%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.closeImg{
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
  .add-wrapper{
    margin: 40px 20px 10px 20px;
    color: black !important;
    border: 1px solid #E4E9F3;
    text-align: left;
    background-color:#Fff;
  }
  .add-title{
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
  .categy-btn .button1 {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
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
    width: 70px;
    height: 22px;
    padding: 0;
}
</style>
