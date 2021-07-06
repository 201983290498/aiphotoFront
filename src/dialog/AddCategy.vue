<template>
  <div id="categydialog">
    <div class="categyborder">
      <div @click="closeDialog" class="closeImg"></div>
      <div class="form-wrapper">
        <div class="categy-title">创建新相册</div>
        <ul class="categyform" :model="imgcategy">
          <li class="categy-label">相册名称</li>
          <li ><el-input placeholder="请输入分类名称" v-model="imgcategy.categy" class="categy-input"></el-input></li>
          <li class="categy-label">相册描述</li>
          <li ><el-input type="textarea" placeholder="相册的简单描述...(300字以内。)" v-model="imgcategy.remark" class="categy-input" :autosize="{minRows: 6,maxRows:6}"></el-input></li>
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
    name: 'AddCategy',
    data(){
        return {
          imgcategy :{
            username: '',
            categy: '',
            remark: ''
          }
        }
    },
    props: {
      username: {
        type: String
      }
    },
    methods: {
      closeDialog(){
        console.log("关闭");
        this.$emit('closeDialog', false);
      },
      onSubmit: function(){
        this.imgcategy.username = this.username;
        var vm = this;
        this.axios({
          method: 'post',
          url: '/api/categy/create',
          data: vm.imgcategy
        }).then(function(resp){
          if(resp.data){
            vm.$message.success('添加成功');
            vm.closeDialog();
          }else{
            vm.$message.warning('创建失败，该分类已经存在!');
          }
        });
      }
    }
}
</script>

<style>
  #categydialog{
    /* 开启定位方式，固定定位，定位的起始点位于屏幕的左上角 */
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
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
  .categyborder{
    /* text-align: center; */
    background-color: #F0F3F8;
    border-radius: 20px;
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    
  }
  .form-wrapper{
    margin: 40px 20px 10px 20px;
    color: black !important;
    border: 1px solid #E4E9F3;
    text-align: left;
    background-color:#Fff;
  }
  .categy-title{
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
  /* input框 placeholder的字样设置 */
  .categyform input::-webkit-input-placeholder,.categyform textarea::-webkit-input-placeholder {
    color: #6C757D;
    font-size:15px;
  }
/* 输入时的样式设定 */
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
</style>