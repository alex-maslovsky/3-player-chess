import Vue from 'vue'
import './services/socket-service'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: createElement => createElement(App),
  router,
}).$mount('#app')
