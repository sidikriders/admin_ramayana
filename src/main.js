import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faExclamationCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationCircle)
library.add(faTimesCircle)
library.add(faBars)
library.add(faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('hideSideMenu')
  if (to.path === '/login') {
    if (localStorage.user_token) {
      next('/')
    } else {
      next()
    }
  } else if (!localStorage.user_token) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
