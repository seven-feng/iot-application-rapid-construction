export default function install(Vue, options) {
  if (!options.plugin) {
    console.error('You have to install plugin first')
    return
  }
  Vue[options.name] = options.plugin
  Object.defineProperties(Vue.prototype, {
    [options.name]: {
      get() {
        return options.plugin
      }
    }
  })
}
