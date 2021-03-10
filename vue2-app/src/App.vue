<template>
  <div id="app">
    <i class="sprite1 sprite1-addr"></i>
    <svg-icon name="door" color="red" @click="handler" />
    <svg-icon name="vip" color="red" @click="handler" />

    <div id="nav" class="van-hairline--top">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/cart">Cart</router-link>
      |
      <router-link to="/list">List</router-link>
      |
      <router-link to="/drag">drag</router-link>
    </div>
    <router-view class="router-view" />
  </div>
</template>
<script>
export default {
  methods: {
    handler() {
      console.log('svg-icon')
    },
  },
}
</script>
<style lang="scss">
@import './styles/sprite/sprite1.scss';
</style>
