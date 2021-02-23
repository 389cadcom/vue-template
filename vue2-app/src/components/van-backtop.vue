<template>
  <transition name="van-fade">
    <div v-show="show" class="backtop" @click="goBacktop">
      <svg-icon name="backtop" size="16px" color="#888" />
      <div class="info" style="color:#888">顶部</div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      limit: 300,
      win: null,
    }
  },
  mounted() {
    var el = this.getScroller(this.$el)
    var vm = this
    this.$nextTick(() => {
      this.win = document.querySelector('.pages')
      this.win.addEventListener('scroll', this.scrollHanlder)
    })
  },
  activated() {
    this.$nextTick(() => {
      this.win = document.querySelector('.pages')
      this.win.addEventListener('scroll', this.scrollHanlder)
    })
  },
  methods: {
    //获取滚动容器
    getScroller(el, root = window) {
      const overflowReg = /scroll|auto/i
      let node = el

      while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== root) {
        const { overflowY } = window.getComputedStyle(node)

        //元素滚动属性
        if (overflowReg.test(overflowY)) {
          if (node.tagName !== 'BODY') {
            return node
          }
          const { overflowY: htmlOverflowY } = window.getComputedStyle(node.parentNode)
          if (overflowReg.test(htmlOverflowY)) {
            return node
          }
        }
        node = node.parentNode
      }

      return root
    },
    debounce(fn, delay = 100) {
      var timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => fn.apply(this, args), delay)
      }
    },
    scrollHanlder(e) {
      var top = this.win.scrollTop
      // console.log(top)
      this.show = top >= this.limit ? true : false
    },
    goBacktop() {
      this.win.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  /* beforeDestroy(){
    this.win.removeEventListener('scroll', this.scrollHanlder)
  }, */
  deactivated() {
    this.win.removeEventListener('scroll', this.scrollHanlder)
  },
}
</script>
<style lang="scss">
.backtop {
  box-sizing: content-box;
  position: fixed;
  z-index: 0;
  font-size: 11px;
  right: 12px;
  bottom: 60px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50px;
  padding: 8px;
  background-color: #fff;
  box-shadow: 1px 2px 4px rgba($color: #000000, $alpha: 0.15);
  .svg-icon {
    margin: 0 6px;
  }
}
</style>
