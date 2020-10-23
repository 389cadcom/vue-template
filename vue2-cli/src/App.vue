<template>
<div id="app">
  <div class="icon">
    <svg-icon name="link" color="red"/>
    <svg-icon name="share" color="red"/>
  </div>
  <div id="nav" class="title">
    <router-link to="/">Home</router-link> |
    <router-link to="/demo">Demo</router-link>
  </div>
  <!-- 默认缓存,配置则不缓存 -->
  <keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="router-view"/>
  </keep-alive>
  <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
</div>
</template>
<script>
export default {

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: relative;
  padding: 30px;
  display: flex;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  &::after{
    @include oneline;
  }
}
.title{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
