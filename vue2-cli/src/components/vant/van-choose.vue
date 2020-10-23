<template>
<div class="van-choose">
  <van-field v-model="field" :label="label" required readonly is-link input-align="right" placeholder="请选择" @click="showPicker = true" />
  <van-popup v-model="showPicker" position="bottom">
    <van-picker title="请选择" :columns="columns" :default-index="index" show-toolbar @cancel="cancel" @confirm="confirm" />
  </van-popup>
  <div></div>
</div>
</template>

<script>

export default {
  model:{
    event: 'change'
  },
  props: {
    label: String,
    value: String,
    columns: {
      type: Array,
      required: true
    }
  },
  computed: {
    field() {
      return this.value || ''
    },
    index(){
      return this.columns.findIndex( item => item.text == this.value)
    }
  },
  data() {
    return {
      showPicker: false,
    }
  },
  methods: {
    confirm(item) {
      this.$emit('change', item.text, item.value)
      this.cancel()
    },
    cancel() {
      this.showPicker = false
    },
  }
}
</script>
