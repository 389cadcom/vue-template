<template>
<div class="vant-field-date">
  <van-field v-if="isEdit" v-model="field" :label="label" readonly is-link input-align="right" placeholder="请选择" @click="showHandler" />
  <van-field v-else v-model="field" :label="label" readonly input-align="right"/>
  <van-popup v-model="showPicker" position="bottom">
    <van-datetime-picker v-model="currentDate" :type="type" title="请选择日期" :formatter="formatter" :min-date="mindate" @cancel="cancel" @confirm="confirm" />
  </van-popup>
  <div></div>
</div>
</template>

<script>
import utils from '@/api/utils'

let date = new Date()
export default {
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number, Date],
    type: {
      type: String,
      default: 'date'
    },
    mindate: {
      type: Date,
      default: () => date,
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formater() {
      if (this.type === 'date') {
        return 'yyyy-MM-dd'
      } else if (this.type === 'datetime') {
        return 'yyyy-MM-dd hh:mm'
      } else if (this.type === 'time') {
        return 'hh:mm'
      } else if (this.type === 'year-month') {
        return 'yyyy-MM'
      }
    },
    field() {
      return this.value ? utils.dateFormat(this.value, this.formater) : ''
    },
  },
  data() {
    return {
      showPicker: false,
      currentDate: ''
    }
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val + '日';
    },
    confirm(value) {
      value = utils.dateFormat(value, this.formater)
      this.currentDate = value
      this.$emit('input', value)
      this.cancel()
    },
    cancel() {
      this.showPicker = false
    },
    showHandler(){
      this.showPicker = true
      this.currentDate = this.value ? new Date(this.value) : date
    }
  }
}
</script>
