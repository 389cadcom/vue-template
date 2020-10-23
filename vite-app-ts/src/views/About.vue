<template>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述内容" />
</template>
<script>
export default {
  watch: {
    '$route'(to, from) {
      console.log(to.path, from.path)
    }
  },
}
</script>
<style lang='scss'>
</style>