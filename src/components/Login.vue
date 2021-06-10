<template>
  <div class="login-box">
  <el-form ref="form" :rules="rule" :model="form" label-width="80px">
  <el-form-item align="center">
    <h2>欢迎登入</h2>
  </el-form-item>
  <el-form-item label="用户名" prop="name">
    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button class="button1" type="primary" @click="onSubmit('form')"><b>登入</b></el-button>
    <el-button class="button2" type="primary" @click="Register()"><b>注册</b></el-button>
  </el-form-item>
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
          {required: true, message: '请输入用户名',trigger: 'blur'},
          {min: 5, max: 12, message: '长度在5-12各字符中间',trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit(fornName) {
      // console.log('submit!');
      var vm = this;
      this.$refs[fornName].validate( (valid) => {
        console.log("进入校验");
        if (valid){
          vm.$message.info('输入成功，正在验证');

          var _name = vm.form.name;
          var _password = vm.form.password;
          console.log(_name+_password);
          // axios异步申请
          this.axios({
            method: "post",
            url: '/api/login',
            data: {
              username: _name,
              password: _password
            }
          }).then(function (reps){
            if(reps.data){
              vm.$message.info("登入成功!欢迎"+_name);
              vm.$router.push({name:"DashBoard", params:{username: _name}});
            }else{
              vm.$message.warning("账号或密码错误,请重新输入");
            }
          });
        }else{
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
  .login-box{
    width: 500px;
    height: 300px;
    border: 1px solid #42b983;
    margin: 150px auto;/*margin调剧中*/
    border-radius: 20px;
    box-shadow: 0px 0px 20px;

    padding: 20px 20px 20px 20px;/*表单到边框的内间距上右下左*/

  }
  .title{
    align-items: center;
  }
  .button1{
    color:green;
    margin-left: 0px;
    font-size: large;

  }
  .button2{
    color: brown;
    margin-right: 0px;
    font-size: large;
  }
  .el-button--text{
    font-family: 微软雅黑;
  }

</style>
