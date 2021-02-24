<template>
  <div class="cart">
    <van-checkbox-group ref="groups" v-model="result" direction="horizontal">
      <van-checkbox v-for="(item, i) in goods" :key="i" :name="item.name">{{ item.label }}</van-checkbox>
    </van-checkbox-group>
    <van-checkbox v-model="isAll" @click="allHandler">全选</van-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [
        { label: 'A', name: 'a' },
        { label: 'B', name: 'b' },
      ],
      isAll: false,
      result: ['a'],
    }
  },
  watch: {
    result(arr) {
      this.isAll = arr.length == this.goods.length ? true : false
    },
  },
  methods: {
    allHandler() {
      this.$refs.groups.toggleAll(this.isAll)
      // this.$refs.goods.toggle(this.isAll)
    },
    /* 
      //店铺、商品
      allHandler(bool){
        this.$refs.goods.forEach((good, i) => {
          good.toggleAll(this.isAll)
          this.$refs.shops[i].toggle(this.isAll)
        })
      },
    */
  },
}
</script>
<style lang="scss"></style>
