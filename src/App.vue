<template>
    <div id="app" class="is-background">
      <router-view></router-view>
    </div>
</template>

<script>
import HelloWorld from './components/DashBoard'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
@import url("css/reset.css");
@import url("css/base.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
.is-background{
  background: url("../static/icon/backgorud1.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

</style>
