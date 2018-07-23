<template>
  <div class="login">
    <!-- <img src="../assets/logo-dummy.png"> -->
    <h3>Admin Login</h3>
    <input class="input" type="text" v-model="username"/>
    <input class="input" type="password" v-model="password">
    <button class="rb-btn p" @click="doLogin">Login</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin: function () {
      var user = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('doLogin', user)
    }
  },
  beforeMount: function () {
    document.title = 'Login'
    this.username = ''
    this.password = ''
  }
}
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    border: solid 2px #7b7b7b;
    border-radius: 10px;
    padding: 20px 20px 0px;
    align-items: center;
    * {
      margin-bottom: 20px;
      width: 100%;
    }
    input.input {
      width: calc(100% - 20px);
    }

    h3 {
      text-align: center;
    }
  }
</style>
