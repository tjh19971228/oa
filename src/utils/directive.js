export default (Vue) => {
  Vue.directive("auth", {
    inserted: function (el, binding, vnode) {
      console.log(binding.value.path)
    }
  })
}
