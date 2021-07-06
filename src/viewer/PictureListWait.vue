<template>

</template>

<script>
export default {
  name: "PictureListWait",
  created() {
    let username= this.$route.params.username;
    let categy = this.$route.params.categy;
    let ispublic = this.$route.params.ispublic;
    this.$router.push({name:"PictureList",params:{username: username,categy:categy,ispublic:ispublic}});
  }
}
</script>

<style scoped>

</style>
