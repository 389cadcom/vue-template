<template>
  <svg class="svg-icon" :class="className" :style="{ color: color, width: size, height: size }" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
//基于svg symbols的svg sprite, symbolId: 'icon-[name]'
export default {
  name: 'svg-icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    color: String,
    size: String,
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
  },
}
</script>
<style>
.svg-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 6px;
  fill: currentColor;
  overflow: hidden;
  /* vertical-align: -0.45em; */
}
</style>
