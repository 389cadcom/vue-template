<template>
  <div class="home">
    <van-cell-group title="large" class="radius" type="large">
      <van-cell required title="单元格" value="内容" />
      <van-cell required title="单元格" size="large" value="内容" />
    </van-cell-group>
    <van-cell-group class="cell-detail">
      <van-cell required title="单元格" value="内容" />
      <van-cell required title="单元格" value="内容" />
    </van-cell-group>
    <van-cell-group title="field">
      <van-field label="单元格" input-align="right" placeholder="请输入" maxlength="12" />
      <van-field label="单元格" input-align="right" placeholder="请输入" maxlength="12" />
      <van-cell required title="文本" />
      <van-field
        type="textarea"
        rows="3"
        center
        class="field-box"
        placeholder="请输入"
        maxlength="12"
        show-word-limit
      />
    </van-cell-group>
    <van-cell-group>
      <van-button type="info" size="small" round>按钮</van-button>
      <van-button type="info" plain class="van-btn-icon" icon="plus">
        按钮
      </van-button>
      <van-button type="info" plain class="van-btn-icon" icon="https://img01.yzcdn.cn/vant/user-active.png">
        按钮
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { confirm } from '@/decorators'

export default {
  name: 'Home',
  data() {
    return {
      key: 'value',
    }
  },
  methods: {
    //@confirm()
    async handler() {
      var res = await this.$api.getTest({ name: 'lonve', age: 10 })
      console.log('object', res)
    },
  },
}
</script>
<style lang="scss">
.home {
  padding: 10px;
}
</style>
