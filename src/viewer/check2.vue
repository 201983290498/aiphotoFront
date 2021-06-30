<template>

  <div class="login-box">
    <div class="title-wrapper">
      <a href="javascript:;"><span class="title-name">Private Photo</span></a>
    </div>
    <el-form class="form1" ref="form" :rules="rule" :model="form" >  
      <div class="input" prop="name">
        <el-input :value="form.username"  class="textbox iconfont"  placeholder="用户名" auto-complete="off"><i class="iconfont">&#xe60f;</i></el-input>
      </div>
      <div class="input">
        <i class="iconfont"></i>
        <el-input class="textbox" type="password" v-model="form.password" placeholder="密码"></el-input>
      </div>
      <div class="loginbtn">
        <el-button class="button1 font1" type="primary" @click="onSubmit('form')"><span class="iconfont">&#xe741;</span>  认证</el-button>
      </div>
      <div class="clearfix1 clearfix">
      <ul >
        <li ><span class="register"  >注册</span></li>
        <li class="line">|</li>
        <li><span >忘记密码</span></li>
      </ul>
      </div>

    </el-form>
  </div>
 </template>
<script>
export default {
  name: "check2",
  data() {
    return {
      form: {
        name: '',
        password: '',
        username: this.$route.params.username
      },
      privatecategy: this.$route.params.categy,
      name: this.GLOBAL.username,
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

          var _name = vm.form.username;
          var _password = vm.form.password;
          
          // axios异步申请
          this.axios({
            method: "post",
            url: '/api/login/Ex',
            data: {
              username: _name,
              pripassword: _password
            }
          }).then(function (reps) {
            if (reps.data) {
              vm.$message.success("独立密码验证成功" );
              vm.GLOBAL.pripassword = true;
              vm.$router.push({name:"SubMain2", params:{username: vm.form.username, categy: vm.privatecategy}});
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
  margin: 100px auto; /*margin调剧中*/
  border-radius: 5px;
  box-shadow: 0px 0px 20px;
  background-color: #fff;
  padding-left: 24px;
  padding-right: 24px; /*表单到边框的内间距上右下左*/
  color: black;
  
}

.title {
  align-items: center;
}




.el-button--text {
  font-family: 微软雅黑;
}



</style>
