import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: config.api,
    token: '',
    err: {
      title: '',
      msg: ''
    },
    showError: 'modal',
    user: {
      username: '',
      role: ''
    },
    isLogin: false,
    sideMenu: false,
    activeRouter: 'login'
  },
  getters: {
    _axios: state => {
      return axios.create({
        baseURL: state.baseUrl,
        timeout: 30000,
        headers: { 'RB-Bearer': state.token }
      })
    },
    _axiosFormData: state => {
      return axios.create({
        baseURL: state.baseUrl,
        timeout: 30000,
        headers: {
          'RB-Bearer': state.token,
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  },
  mutations: {
    afterLogin (state, data) {
      state.token = data.token
      state.user.username = data.username
      state.user.role = data.role
      state.isLogin = true
    },
    stillLogin (state, data) {
      state.user.username = data.username
      state.user.role = data.role
      state.isLogin = true
    },
    setTokenOnly (state, data) {
      state.token = data
    },
    showError (state, data) {
      state.err = {
        title: data.title || 'Error',
        msg: data.msg
      }
      state.showError = 'modal is-active'
    },
    closeError (state) {
      state.err = {
        title: '',
        msg: ''
      }
      state.showError = 'modal'
    },
    logout (state) {
      state.token = ''
      state.user.username = ''
      state.user.role = ''
      state.isLogin = false
    },
    changeSideMenu (state) {
      state.sideMenu = !state.sideMenu
    },
    hideSideMenu (state) {
      state.sideMenu = false
    }
  },
  actions: {
    doLogin (context, user) {
      axios.post(context.state.baseUrl + '/auth/login', user).then(resp => {
        var _data = resp.data
        if (_data.status) {
          context.commit('afterLogin', _data.data)
          localStorage.setItem('user_token', _data.data.token)
          router.push('/')
        } else {
          context.commit('showError', { title: 'Login Error', msg: _data.data })
        }
      }).catch(err => {
        alert('ERROR')
        console.error(err)
      })
    },
    doLogout (context, user) {
      context.commit('logout')
      delete localStorage.user_token
      router.push('/login')
    },
    showSideMenu (context) {
      context.commit('changeSideMenu')
    }
  }
})
