<template>
  <div id="app">
    <i class="sprite1 sprite1-addr"></i>
    <svg-icon name="door" color="red" @click="handler" />
    <svg-icon name="vip" color="red" @click="handler" />
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="router" />
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
