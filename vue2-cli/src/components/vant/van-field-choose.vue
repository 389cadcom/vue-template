<template>
<div class="">
  <van-cell :title="title" label-class="right" label-width="50%" :value="nodes.label" center isLink @click="showPicker = true"></van-cell>
  <van-overlay :show="showPicker" lock-scroll @click="showPicker = false"></van-overlay>
  <transition name="van-fade" v-if="trees.length">
    <div v-show="showPicker" class="tree-choose van-popup van-popup--bottom">
      <treeselect class="tree " name="origanize"
        :options="trees"
        :multiple="false"
        :searchable="false"
        :always-open="true"
        :disable-branch-nodes="true"
        :default-expand-level="1"
        placeholder="请选择..."
        noOptionsText="无数据"
        noChildrenText="没有子节点"
        v-model="datas"
        :max-height="362"
        @select="treeHandler"
      />
    </div>
  </transition>
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    title: String,
    value: String,
  },
  computed: {
    ...mapState([
      'trees',
    ])
  },
  watch: {
    showPicker(newValue, oldValue) {
      if(newValue && this.trees.length == 0){
        this.$store.dispatch('getUserRightsTree')
      }
    }
  },
  data() {
    return {
      datas: null,
      nodes: {
        label:'请选择'
      },
      showPicker: false
    }
  },
  methods:{
    treeHandler(nodes){
      this.nodes = nodes
      this.showPicker = false
      this.$emit('input', nodes.id)
    },
  }
}
</script>
<style lang="scss">
.tree-choose {
  position: fixed;
  z-index: 2;
  bottom:0;
  left: 0;
  width: 100%;
  height: 360px;

  .vue-treeselect__control{
    visibility: hidden;
    display: none;
  }
  .vue-treeselect__menu{
    min-height: 362px;
    border: none;
  }
}
</style>
