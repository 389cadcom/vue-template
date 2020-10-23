<template>
  <p>format: {{ $formater(time) }}</p>
  <img alt="Vue logo" src="./assets/logo.png" width="100" />
  <!-- <van-tabbar v-model="index">
    <van-tabbar-item to="/" icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item to="/about" icon="search">About</van-tabbar-item>
  </van-tabbar> -->
  <van-tabs v-model="index">
    <van-tab to="/" title="首页">首页</van-tab>
    <van-tab to="/about" title="关于">关于</van-tab>
    <van-tab to="/setting" title="设置">设置</van-tab>
  </van-tabs>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      index: 0,
      time: Date.now(),
    }
  },
  mounted() {
    // console.log('object')
  },
}
</script>

<style lang="scss">
img {
  border: 1px solid $bg;
}
</style>
