<template>

  <div class="login-box">
    <div class="title-wrapper">
      <a href="javascript:;"><span class="title-name">AIPhoto</span></a>
      <button class="titlebtn clearfix"><i class="far fa fa-language"></i></button>
      <p class="title-content">WELCOME TO OUR AIPHOTO SYSTEM</p>
    </div>
    <el-form class="form1" ref="form" :rules="rule" :model="form" label-width="80px">  
      <div class="input" prop="name">
        <el-input class="textbox iconfont" v-model="form.name" placeholder="用户名"><i class="iconfont">&#xe60f;</i></el-input>
      </div>
      <div class="input">
        <i class="iconfont"></i>
        <el-input class="textbox" type="password" v-model="form.password" placeholder="密码"></el-input>
      </div>
      <div class="loginbtn">
        <el-button class="button1 font1" type="primary" @click="onSubmit('form')"><span class="iconfont">&#xe741;</span> 登入</el-button>
      </div>
      <div class="clearfix1 clearfix">
      <ul >
        <li @click="Register()"><span class="register"  >注册</span></li>
        <li class="line">|</li>
        <li><span >忘记密码</span></li>
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
              vm.GLOBAL.pictureList = [];
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
@import url('../css/login.css');
@import url('../iconfont/iconfont1/iconfont.css');
@import url('../iconfont/fa/css/all.css');


.login-box {
  width: 500px;
  border: 1px solid  #E2E4EC;
  margin: 150px auto; /*margin调剧中*/
  border-radius: 5px;
  box-shadow: 0px 0px 20px;
  background-color: #fff;
  padding-left: 24px;
  padding-right: 24px; /*表单到边框的内间距上右下左*/

}

.title {
  align-items: center;
}





.el-button--text {
  font-family: 微软雅黑;
}


</style>
