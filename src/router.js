import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import showType from './views/showType.vue'
import showTypeNew from './views/showTypeNew.vue'
import Attraction from './views/Attraction.vue'
import FormAttraction from './views/FormAttraction.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/show-type',
      name: 'show-type',
      component: showType
    },
    {
      path: '/show-type/new',
      name: 'show-type-new',
      component: showTypeNew
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: Attraction
    },
    {
      path: '/attraction/:id',
      name: 'form-attraction',
      component: FormAttraction
    }
  ]
})
