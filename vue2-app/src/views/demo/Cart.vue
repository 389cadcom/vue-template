<template>
  <div class="cart">
    <van-search class="dark" clearable shape="round" v-model="key" show-action placeholder="请输入搜索关键词">
      <template #action1>
        <!-- <van-button size="small" type="info" round @click="">搜索</van-button> -->
      </template>
    </van-search>
    <van-steps :active="index">
      <van-step>步骤1</van-step>
      <van-step>步骤2</van-step>
      <van-step>步骤3</van-step>
    </van-steps>
    <van-steps :active="-1" direction="vertical">
      <van-step>步骤1</van-step>
      <van-step>步骤2</van-step>
      <van-step>步骤3</van-step>
    </van-steps>

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
      key: '',
      index: 1,
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
