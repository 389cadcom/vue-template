<template>
  <van-button size="small" type="success" @click="handler">Toast</van-button>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HelloWorld from '/@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    handler() {
      this.$toast('toast')
    },
  },
})
</script>
