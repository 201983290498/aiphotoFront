<template>

  <div class="login-box0">
    <div class="title-wrapper0">
      <a href="javascript:;"><span class="title-name0">AIPhoto</span></a>
      <button class="titlebtn0 clearfix"><i class="far fa fa-language"></i></button>
      <p class="title-content0">WELCOME TO OUR AIPHOTO SYSTEM</p>
    </div>
    <el-form class="form10" ref="form" :rules="rule" :model="form" label-width="80px">  
      <div class="input0" prop="name">
        <el-input class="textbox0 iconfont" v-model="form.name" placeholder="用户名"><i class="iconfont">&#xe60f;</i></el-input>
      </div>
      <div class="input0">
        <i class="iconfont"></i>
        <el-input class="textbox0" type="password" v-model="form.password" placeholder="密码"></el-input>
      </div>
      <div class="loginbtn0">
        <el-button class="button10 font10" type="primary" @click="onSubmit('form')"><span class="iconfont">&#xe741;</span> 登入</el-button>
      </div>
      <div class="clearfix10 clearfix">
      <ul>
        <li @click="Register()" class="li"><span class="register0"  >注册</span></li>
        <li class="line0 li">|</li>
        <li class="li"><span >忘记密码</span></li>
      </ul>
      </div>

    </el-form>
  </div>
 </template>
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      rule: {//对元素内容进行验证
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 12, message: '长度在5-12个字符中间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit(fornName) {
      // console.log('submit!');
      var vm = this;
      this.$refs[fornName].validate((valid) => {
        console.log("进入校验");
        if (valid) {
          vm.$message.info('输入成功，正在验证');

          var _name = vm.form.name;
          var _password = vm.form.password;
          console.log(_name + _password);
          // axios异步申请
          this.axios({
            method: "post",
            url: '/api/login',
            data: {
              username: _name,
              password: _password
            }
          }).then(function (reps) {
            if (reps.data) {
              vm.$message.success("登入成功!欢迎" + _name);
              vm.GLOBAL.username = _name;
              vm.GLOBAL.password = _password;
              vm.GLOBAL.pripassword = false;
              vm.GLOBAL.ispublic= true;
              console.log(vm.GLOBAL.ispublic);
              vm.GLOBAL.pictureList = [];
              vm.GLOBAL.deleteStatus = false;
              vm.GLOBAL.deleteList = [];
              vm.GLOBAL.deleteMap = new Map();
              vm.GLOBAL.pricategy = [];
              vm.GLOBAL.downStatus = false;
              vm.GLOBAL.showList = false;
              vm.$router.push({name: "DashBoard", params: {username: _name}});
            } else {
              vm.$message.warning("账号或密码错误,请重新输入");
            }
          });
        } else {
          vm.$message.warning('用户名密码格式不正确');
          console.log('error submit!!');
          return false;
        }
      });
    },
    Register() {
      console.log('正在跳转注册');
      this.$router.push('/register');
    }
  },
  created() {
  }
}
</script>

<style scoped>

@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');

/* 设置标题框的大小 */
.title-wrapper0{
    width: 410px;
    /* height: 76px; */
    margin: 0 auto;
}
.title-wrapper0 a{
    display: block;
    margin-top: 30px;
    text-align: center;
    text-decoration: none;
}
.title-name0{
    font-size: 35px;
    color: #343A40;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-weight: 700 !important;
}
.title-content0{
    width: 100%;
    font-size: 0.875rem;
    text-align: center;
    font-weight: 700!important;
    color: #6C757C;
    margin-top: 5px;
    margin-bottom: 22px;
}


.title-wrapper0 a:hover{
    text-decoration: underline;
}

.input0{
    margin-bottom: 24px;
}
ul .li{
    float: left;
    font-size: 16px;
    font-weight: 700 !important;
    color: #6c757d;
}
.line0,.line0:hover{
    margin: 0 10px;
    color: #E8E8E8;
}
.register0{
    margin-left: 165px;
}

.el-button0 span{
    font-size: 21px;
    vertical-align: -2px;
    margin-right: -4px;
}
.font10{
    font-weight: 700 !important;
}
.clearfix10{
    margin-bottom: 45px;
}
ul .li:hover{
    color: #3D4246;
}

.titlebtn0{
    float: right;
    margin-top: -52px;
    margin-right: 4px;
    width: 57px;
    height: 46px;
    border: #fff;
    border-radius: 4px;
    background-color: #F8F9FC;
    font-weight: 900 !important;
    font-size: 18px;
}
.titlebtn0:hover{
 background-color: #D7DEED;
}
.button10 {
  background-color: #0665D0;
  margin-left: 0px;
  font-size: 16px;
  width: 100%;
  height: 45px;
  margin-bottom: 25px;
}
.button10:hover{
  background-color: #117EF8;
  box-shadow: 3px 5px 0px 0px #E2E4EC;
}

.login-box0 {
  width: 500px;
  border: 1px solid  #E2E4EC;
  margin: 150px auto; /*margin调剧中*/
  border-radius: 5px;
  box-shadow: 0px 0px 20px;
  background-color: #fff;
  padding-left: 24px;
  padding-right: 24px; /*表单到边框的内间距上右下左*/

}

.title0 {
  align-items: center;
}





.el-button--text0 {
  font-family: 微软雅黑;
}



</style>
