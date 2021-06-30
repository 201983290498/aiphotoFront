<template>
    <div id="dialog">
        <div class="border">
            <div @click="closeDialog" class="closeImg"></div>
            <div class="form-wrapper" :model='imgcategy'>
              <ul class="form">
                <li class="label"></li>
                <li class="input"></li>
                <li class="label"></li>
                <li class="input"></li>
                <li class="label"></li>
                <li class="text"></li>
              </ul>
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
      // username: {
      //   type: string
      // }
      username: String
    },
    methods: {
      closeDialog(){
        console.log("关闭");
        this.$emit('closeDialog', false);
      },
      onSubmit: function(){
        this.imgcategy.username = this.username;
        var vm = this;
        //异步申请
        this.axios({
          method: 'post',
          url: '/api/categy/create',
          data: vm.imgcategy
        }).then(function(resp){
          if(resp.data){
            vm.$message.success('添加成功');
            closeDialog();
          }else{
            vm.$message.warning('创建失败，该分类已经存在!');
          }
        });
      }
    }
}
</script>

<style>
  #dialog{
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
  .border{
    text-align: center;
    background-color: white;
    border-radius: 20px;
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>