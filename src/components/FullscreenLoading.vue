<template lang="pug">
  .modal.is-active(v-show="isLoading")
    .modal-background
    .modal-content
      img(src= '@/assets/spinner.gif')
</template>

<script>
export default {
  name: 'loading-fullscreen',
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  text-align: center;
}
</style>
