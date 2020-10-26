<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="handler">click</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { confirm } from '@/decorators'

console.log(confirm)
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    @confirm()
    handler() {
      // this.$toast('obj')
      console.log('object')
    },
  },
}
</script>
