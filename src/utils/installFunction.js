import store from "@/store"
export default {
  install(Vue, option) {
    Vue.prototype.$auth = (path, type = 'path') => {
      let menus = store.getters.menus
      let data = []
      function getPath(menus, data) {
        menus.forEach(item => {
          data.push(item.path)
          if (item.children && item.children.length) {
            getPath(item.children, data)
          }
        })
      }
      function getName(menus, data) {
        menus.forEach(item => {
          data.push(item.name)
          if (item.children && item.children.length) {
            getName(item.children, data)
          }
        })
      }
      if (type === 'path') {
        getPath(menus, data)
      }
      else {
        getName(menus, data)
      }
      if (type === 'path' && data.includes(path)) {
        return true
      }
      if (type === 'name' && data.includes(path)) {
        return true
      }

    }
  }
}
