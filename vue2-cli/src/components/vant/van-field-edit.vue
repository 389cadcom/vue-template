<template>
  <van-field
    v-if="type=='textarea'"
    v-bind="$attrs"
    :border="!isEdit"
    :rows="isEdit ? 3:1"
    :readonly="!isEdit"
    :placeholder="isEdit?'请填写':''"
    :class="{'box-textarea':isEdit}"
    :show-word-limit="isEdit"
    :value="area"
    type="textarea"
    class="textarea--block"
    autosize
    maxlength="255"
    @input="val => $emit('input', val)"
  />
  <van-field
    v-else
    v-bind="$attrs"
    :type="type"
    input-align="right"
    :value="value"
    :readonly="!isEdit"
    :placeholder="isEdit?place:''"
    @input="val => $emit('input', val)"
  />
</template>
<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    place: {
      type: String,
      default: '请填写',
    },
  },
  computed: {
    area() {
      return this.value || ''
    }
  },
}
</script>
