<template>

</template>

<script>
export default {
  name: "PictureListWait",
  created() {
    var username= this.$route.params.username;
    var categy = this.$route.params.categy;
    var ispublic = this.$route.params.ispublic;
    this.$router.push({name:"PictureList",params:{username: username,categy:categy,ispublic:ispublic}});
  }
}
</script>

<style scoped>

</style>
