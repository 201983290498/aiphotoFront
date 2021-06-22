<template>
  <div class="reg-box">
    <el-form ref="form" :rules="rule" :model="form" label-width="100px" >
    <div class="title-wrapper">
      <a href="javascript:;"><span class="title-name">AIPhoto</span></a>
      <button class="titlebtn clearfix"><i class="far fa fa-language"></i></button>
      <p class="title-content">WELCOME TO OUR AIPHOTO SYSTEM</p>
    </div >
      <div class='input'  prop="username">
        <input  v-model="form.username" type="text" placeholder="用户名">
      </div>
      <div class='input' >
          <input v-model="form.trName" type="text" placeholder="真实姓名">
      </div>
      <div class='input'>
          <input v-model="form.email" type="text" placeholder="邮箱">
      </div>

      <div class='input'  prop="password">
          <input v-model="form.password" type="text" placeholder="密码">
      </div>

      <div class='input'>
        <input v-model="form.pripassword" type="text" placeholder="独立密码">
      </div>
      <div class="loginbtn">
        <el-button class="button1 font1" type="primary" @click="Submit('form')"><span class="iconfont">&#xe71c;</span> 注册</el-button>
      </div>
      
      <div class="clearfix1 clearfix">
      <ul >
        <li @click="Register()"><span class="register" @click="back()" >返回登入</span></li>
      </ul>
      </div>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: '',
        email: '',
        trName: '',
        password: '',
        pripassword: '',
      },
      rule: {
        username: [
          {required: true, message: '用户名不能为空' , trigger:'blur'},
          {min: 5, max: 12, message: '用户名的长度在5~20字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: "密码不能为空" , trigger:'blur'},
          {min: 5, max: 12, message: '用户名的长度在5~20字符之间', trigger: 'blur'}
        ],
      },
      warning1: "邮箱格式不正确",
      warning2: "两次密码不正确"
    }
  },
  methods: {
    Submit(formName){
      var vm = this;
      this.$refs[formName].validate((valid) =>{
        console.log('进行校验');
        if(valid){
          vm.$message.info('正在注册');
          if(vm.form.email.match('.*?@.*?')==null){
            vm.$message.error('邮箱错误');
          }else{
            vm.axios({
                method: "post",
                url: "/api/register",
                data: {
                 username: vm.form.username,
                 password: vm.form.password,
                 pripassword: vm.form.pripassword,
                 truName: vm.form.trName,
                 email: vm.form.email
                }
              }
            ).then(function (reps){
              if(reps.data){
                vm.$message.info("注册成功。")
                vm.$router.push('/logout');
              }else{
                vm.$message.warning("账号已存在,注册失败");
              }

            });
          }
        }
        }
      )

    },
    back(){
      this.$router.push('/logout')
    }
  }
}
</script>

<style scoped>
@import url('../css/login.css');
@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');
  .reg-box{
    /*width: 60%;*/
    /*height: 90%;*/
  width: 500px;
  border: 1px solid  #E2E4EC;
  margin: 150px auto; /*margin调剧中*/
  border-radius: 5px;
  box-shadow: 0px 0px 20px;
  background-color: #fff;
  padding-left: 24px;
  padding-right: 24px; /*表单到边框的内间距上右下左*/
  margin-top: 40px;
  }

  .button2{
    margin-right: 30px;
  }
input{
    background-color: #F0F3F8 !important;
    width: 100%;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-appearance: none;
    height: 48px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    color: #495057;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    font-size: 18px;
    font-weight: 500;
   font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}
input:hover{
  border: 1px solid #C0C4CC;
}
.clearfix1{
  margin-left: 30px;
}
</style>
