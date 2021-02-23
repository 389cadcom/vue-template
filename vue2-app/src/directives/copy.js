export default {
  bind(el, binding) {
    console.log(binding)
    let { name, value, expression } = binding

    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        console.log('无复制内容')
        return
      }
      let textarea = document.createElement('textarea')
      textarea.readOnly = true
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el.$value
      document.body.appendChild(textarea)

      textarea.select()
      let result = document.execCommand('Copy')
      if (result) {
        console.log('复制成功')
      }
      document.body.removeChild(textarea)
    }

    // 绑定点击事件，就是所谓的一键 copy
    el.addEventListener('click', el.handler)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el, { value }) {
    el.removeEventListener('click', el.handler)
  },
}
