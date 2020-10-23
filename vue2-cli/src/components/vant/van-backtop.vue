<template>
<transition name="van-fade">
  <div v-show="show" class="backtop" @click="goBacktop">
    <svg-icon name="backtop" size="20px" color="#999"></svg-icon>
    <div class="info" style="color:#999">顶部</div>
  </div>
</transition>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      limit:260
    }
  },
  mounted () {
    var vm = this
    this.$nextTick(()=>{
      window.addEventListener('scroll', this.scrollHanlder)
    })
  },
  methods: {
    debounce(fn, delay=100){
      var timer
      return function(...args){
        if(timer){
          clearTimeout(timer)
        }
        timer = setTimeout(()=>fn.apply(this, args), delay)
      }
    },
    scrollHanlder(e){
      var top = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(top)
      this.show = top >= this.limit ? true : false
    },
    goBacktop() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.scrollHanlder)
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollHanlder)
  }
}
</script>
