import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import MainPage from "./views/MainPage.vue"
import About from "./views/About.vue"
import MyCartPage from "./views/MyCartPage.vue"
import LoginPage from "./views/LoginPage.vue"

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes: [
    {
      path:'/',
      component: MainPage
    },
    {
      path:'/myCart',
      component: MyCartPage
    },
    {
      path:'/about',
      component: About
    },
    {
      path:'/login',
      component: LoginPage
    }
  ]
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
