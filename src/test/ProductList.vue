<template>
<div>
  <el-main>
    <!--          表格-->
    <el-table :data="user">
      <el-table-column prop="idnum" label="编号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="职业" label="地址">
      </el-table-column>
    </el-table>
  </el-main>
</div>
</template>

<script>
export default {
  name: "productList",
  data: function (){
    return {
      user: []
    }
  },
  created() {
    var vm = this;
    this.axios({
      method: "get",
      url: "https://mock.mengxuegu.com/mock/606993ede34b2e50a355ca6d/vue/users"
    }).then(function (rep){
      console.log(rep.data.users);
      console.log("success")
      vm.user = rep.data.users;
    });
  }
}
</script>

<style scoped>

</style>
