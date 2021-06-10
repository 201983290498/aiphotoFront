<template>
  <div class="reg-box">
    <el-form ref="form" :rules="rule" :model="form" label-width="100px" >
      <el-form-item align="center">
        <h2 ><b>注册</b></h2>
      </el-form-item>
      <el-form-item label="账号注册" prop="username">
        <el-input v-model="form.username" type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="姓名" >
          <el-input v-model="form.trName" type="text" placeholder="请输入真实姓名"></el-input>
      </el-form-item>

      <el-form-item label="注册邮箱">
          <el-input v-model="form.email" type="text" placeholder="请输入注册的邮箱"></el-input>
      </el-form-item>

      <el-form-item label="密码"  prop="password">
          <el-input v-model="form.password" type="text" placeholder="请输入注册的邮箱"></el-input>
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input v-model="form.comPassword" type="text" placeholder="确认密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="button1" type="primary" @click="Submit('form')" style="margin-left: 20px ">注册</el-button>
        <el-button class="button2" type="primary" @click="back()">退出</el-button>
      </el-form-item>

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
        comPassword: '',
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
      var str = vm.form.comPassword;
      var str1 = vm.form.password;
      this.$refs[formName].validate((valid) =>{
        console.log('进行校验');
        if(valid){
          vm.$message.info('正在注册');
          if(vm.form.email.match('.*?@.*?')==null){
            vm.$message.error('邮箱错误');
          }else if(str != str1){
            vm.$message.error('两次输入的密码不正确');
          }else{
            vm.axios({
                method: "post",
                url: "/api/register",
                data: {
                 username: vm.form.username,
                 password: vm.form.password,
                 truName: vm.form.trName,
                 email: vm.form.email
                }
              }
            ).then(function (reps){
              if(reps.data){
                vm.$message.info("注册成功。")
                vm.$router.push('/logout');
              }else{
                vm.$message.warning("账号已存在注册失败");
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
  .reg-box{
    /*width: 60%;*/
    /*height: 90%;*/
    border: 1px solid #42b983;
    border-radius: 20px;
    box-shadow: 2px 2px 20px;
    margin-bottom: 30px;
    margin-left: 330px;
    margin-right: 330px;
    margin-top: 40px;
    padding: 20px 20px 20px 20px;
    text-align: center;

  }
  .button1{
    color: green;
  }
  .button2{
    margin-right: 30px;
  }
</style>
