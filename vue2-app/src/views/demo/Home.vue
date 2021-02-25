<template>
  <div class="home">
    <van-cell-group>
      <van-button type="info" plain class="van-btn-icon" icon="plus">
        按钮
      </van-button>
      <van-button column group plain icon="edit" type="info">按钮</van-button>

      <van-button group plain type="primary" class="van-btn-icon" icon="plus">
        按钮
      </van-button>
      <van-button group plain type="danger" class="van-btn-icon" icon="https://img01.yzcdn.cn/vant/user-active.png">
        按钮
      </van-button>
    </van-cell-group>
    <van-cell-group title="large" class="radius" size="large">
      <van-cell center icon="location-o" value-class="van-ellipsis" value="每隔一至二个月发布，包含新特性和较大的功能更新，向下兼容" is-link>
        <template #extra>
          <van-icon name="cross" />
        </template>
      </van-cell>
      <van-cell required title="单元格" value="内容" label="包含新特性和较大的功能更新" />
      <van-cell required title="单元格" size="large" value="内容" />
    </van-cell-group>
    <van-cell-group class="cell-detail">
      <van-cell title-class="group-title" title="基础信息" />
      <van-cell required title="单元格" value="内容" />
      <van-cell required title="单元格" value="内容" />
    </van-cell-group>
    <van-cell-group title="field">
      <van-field label="单元格" input-align="right" placeholder="请输入" maxlength="12" />
      <van-field label="单元格" input-align="right" placeholder="请输入" maxlength="12" />
      <van-field center type="textarea" rows="1" autosize label="自适合高度" placeholder="请输入" v-model="key" />
      <van-cell required title="文本" />
      <van-field type="textarea" rows="3" center class="field-box" placeholder="请输入" maxlength="12" show-word-limit />
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
  mounted() {
    this.handler()
  },
  methods: {
    //@confirm()
    async handler() {
      var res = await this.$api.getUser({ name: 'lonve', age: 10 })
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
