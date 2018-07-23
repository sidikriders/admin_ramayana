<template>
  <div>
    <div class='top-bar'>
      <font-awesome-icon @click=showSideMenu icon="bars"/>
      <p>Hi, {{ user }}. <a @click=logout>Logout</a></p>
    </div>
    <aside :class=sideMenuClass>
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><router-link to='/'>Dashboard</router-link></li>
        <li><router-link to='/inquiries'>Inquiries</router-link></li>
      </ul>
      <p class="menu-label">
        Show
      </p>
      <ul class="menu-list">
        <li><router-link to='/show-type'>Show Type</router-link></li>
        <li><router-link to='/sho-schedule'>Show Schedule</router-link></li>
      </ul>
      <!-- <p class="menu-label">
        Administration
      </p>
      <ul class="menu-list">
        <li><a>Team Settings</a></li>
        <li>
          <a class="is-active">Manage Your Team</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
      <p class="menu-label">
        Transactions
      </p>
      <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul> -->
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  position: fixed;
  width: 100vw;
  height: 45px;
  background-color: burlywood;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  svg {
    font-size: 20px;
    cursor: pointer;
  };
  p {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
}

.side-bar {
  position: fixed;
  top: 45px;
  left: -300px;
  height: 100vh;
  width: 300px;
  padding: 15px;
  background-color: #bd8237;
  transition: all 0.15s ease-in;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.side-bar.active {
  left: 0;
}

</style>

<script>
export default {
  name: 'main-menu',
  computed: {
    activeRouter () {
      return this.$store.state.activeRouter
    },
    user () {
      return this.$store.state.user.username
    },
    sideMenuClass () {
      return this.sideMenu ? 'menu side-bar active' : 'menu side-bar'
    },
    sideMenu () {
      return this.$store.state.sideMenu
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('doLogout')
    },
    showSideMenu () {
      this.$store.dispatch('showSideMenu')
    }
  }
}
</script>
