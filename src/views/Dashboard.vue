<template>
  <div class="home">
    <!-- <img src="../assets/logo-dummy.png"> -->
    <p v-for="li in list" :key="li.id">
      {{ li.name }}
    </p>
  </div>
</template>

<script>

// @ is an alias to /sr
export default {
  name: 'dashboard',
  data: function () {
    return {
      list: []
    }
  },
  beforeMount: function () {
    document.title = 'Dashboard'
  }
}
</script>
