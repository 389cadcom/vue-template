<template>
  <div class="about">
    <van-photos :images="arr" title="图片集--flex-wrap" />
    <van-cell-group size="large">
      <div class="flex">
        <div class="">flex</div>
        <!-- contain:保持原有尺寸比例, 以长边为最小值, 内容被缩放 -->
        <!-- cover:保持原有尺寸比例, 以短边为最小值, 长边会被剪切 -->
        <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" radius="6" width="90" height="90" fit="cover" />
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg" radius="6" width="90" height="90" style="object-fit:contain; margin-left:10px;" />
      </div>
      <div class="flex-h">
        <div class="">水平居中</div>
        <div class="">flex-h</div>
      </div>
      <div class="flex-v">
        <van-icon class-prefix="van-icon" name="location-o" size="24" color="red" />
        <van-tag type="primary">居中</van-tag>
        <div class="">flex-h</div>
      </div>
      <div class="flex around">
        <div class="">flex around</div>
        <div class="">flex</div>
      </div>
      <div class="flex between">
        <div class="">flex between</div>
        <div class="">flex</div>
      </div>
      <div class="flex">
        <div class="flex-1">flex</div>
        <div class="flex-2">flex between</div>
      </div>
    </van-cell-group>
    <van-cell-group style="padding:16px">
      <div class="flex flex-wrap">
        <div class="item">flex wrap</div>
        <div class="item">flex wrap</div>
        <div class="item">flex wrap</div>
      </div>
      <van-grid direction="horizontal" :column-num="3">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ['https://img01.yzcdn.cn/vant/cat.jpeg', '/static/images/sprite.png', '/static/images/sprite1.png'],
    }
  },
}
</script>
<style lang="scss"></style>
