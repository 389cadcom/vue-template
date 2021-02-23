<template>
  <van-cell size="small" :title="title" class="photos-view" :border="false" v-show="images.length">
    <template #label>
      <van-image v-for="(img, i) in images" :key="i" :src="img" fit="cover" @click="showPreview(i)" />
    </template>
  </van-cell>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  props: {
    title: String,
    images: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  methods: {
    showPreview(index) {
      const instance = ImagePreview({
        images: this.images,
        swipeDuration: 300,
        closeable: true,
        closeOnPopstate: true,
        startPosition: index,
      })
    },
  },
}
</script>
<style lang="scss">
.photos-view {
  $gutter: 8px;
  margin-bottom: -$gutter;
  .van-cell__label {
    display: flex;
    flex-wrap: wrap;
    margin-right: -$gutter;

    .van-image {
      box-sizing: border-box;
      flex-basis: 33.33333%;
      padding-right: $gutter;
      margin-bottom: $gutter;
      max-height: 4.5rem;
    }
  }
}
</style>
