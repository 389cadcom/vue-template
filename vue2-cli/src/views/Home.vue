<template>
  <div class="home">
    <!-- <img class="logo" alt="Vue logo" src="../assets/logo.png"> -->
    <i class="font font-eye"></i>

    <!-- <van-icon class-prefix="font" name="eye" /> -->

    <div class="sprite1 sprite1-addr"></div>
    <van-button type="primary" size="small" @click="handler">登录请求</van-button>&nbsp;

    <van-button type="primary" size="small" @click="handler1">取消请求</van-button>
  </div>
</template>

<script>
import AxiosApi from 'axios'
import axios from '../api/api'

export default {
  name: 'Home',
  data() {
    return {
      source: null,
      cancel: null
    }
  },
  mounted () {
    axios.get('http://httpbin.org/get')
    axios.get('http://httpbin.org/get')
  },
  methods: {
    handler() {
      axios.post('http://httpbin.org/post')
      return
      var source = AxiosApi.CancelToken.source()
      this.source = source
      axios.get('http://172.16.60.116:3000/', {}, { cancelToken: source.token }).then( res => {
        console.log(res)
        this.$store.commit('set_token', res.token)
        console.log('token:' + this.$store.state.token)
      })
    },
    handler1() {
      // console.log(axios.source)
      this.source.cancel('用户取消请求')
    }
  },
}
</script>
<style lang="scss">
.logo{
  width: 8rem;
}
</style>
