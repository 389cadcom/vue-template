<template>
<svg class="svg-icon" :class="className" :style="{color:color, width: size, height:size}" aria-hidden="true" v-on="$listeners">
  <use :xlink:href="iconName"></use>
</svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
		},
		color:String,
		size:String,
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    }
  },
}
</script>
<style>
.svg-icon{
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.45em;
  fill: currentColor;
	overflow: hidden;
}
</style>
