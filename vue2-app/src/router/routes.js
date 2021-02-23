const files = require.context('./modules', false, /\.js$/)

const routes = [
  /* {
    path: '/',
    name: 'Home',
    component: Home,
  }, */
]

let exclude = ['demo']
files.keys().forEach(key => {
  let name = key.replace(/^\.\/|\.js$/g, '')
  // if (exclude.includes(name)) return false

  let file = files(key).default
  if (Array.isArray(file)) {
    routes.push(...file)
  } else {
    routes.push(file)
  }
})

export default routes
