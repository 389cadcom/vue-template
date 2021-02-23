<template>
  <div class="about">
    <van-photos :images="arr" title="图片集" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ['/static/images/sprite.png', '/static/images/sprite1.png'],
    }
  },
}
</script>
