<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <van-button type="info" @click="handler">click</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { confirm } from '@/decorators'

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
