export default {
  bind(el, binding, vNode) {
    //
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}
