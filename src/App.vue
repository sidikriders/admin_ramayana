<template>
  <div id="app">
    <modal-error></modal-error>
    <main-menu v-if=isLogin></main-menu>
    <transition name='slide'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import modalError from '@/components/modalError.vue'
import mainMenu from '@/components/mainMenu.vue'

export default {
  name: 'App',
  components: {
    'modal-error': modalError,
    'main-menu': mainMenu
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  beforeMount () {
    if (localStorage.user_token) {
      this.$store.commit('setTokenOnly', localStorage.user_token)
      this.$store.getters._axios.get('/auth').then(resp => {
        if (resp.data.status) {
          this.$store.commit('stillLogin', resp.data.data)
        } else {
          console.error(resp.data.data)
          this.$store.dispatch('doLogout')
        }
      })
    }
  }
}

</script>

<style lang="scss">
  @import '/assets/style.scss';
</style>
