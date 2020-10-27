<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
    <van-button type="info" @click="handler">click</van-button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { confirm } from '@/decorators'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      key: 'value',
    }
  },
  methods: {
    // @confirm()
    async handler() {
      var res = await this.$api.getTest({ name: 'lonve', age: 10 })
      console.log('object', res)
    },
  },
}
</script>
<style lang="scss" src="./_home.scss"></style>
