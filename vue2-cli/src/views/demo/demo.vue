<template>
<div>
  <van-button size="small" type="info" @click="logout">退出</van-button>
</div>
</template>
<script>
import api from '@/api/api'
export default {
  methods: {
    logout() {
      api.get('http://httpbin.org/status/401').then( res => {
        console.log(res)
      })
    }
  },
}
</script>
<style scoped>
  
</style>