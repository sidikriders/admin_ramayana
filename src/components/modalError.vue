<template>
  <div :class="showError">
    <div class="modal-background" @click="closeError"></div>
    <div class="modal-content">
      <div>
        <font-awesome-icon icon="exclamation-circle"/>
        <p>{{ title }}</p>
        <p>{{ data }}</p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeError"></button>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  transition: all 0.15s ease-in;
}

.modal.is-active {
  transition: all 0.15s ease-in;
}

.modal-content > div {
  width: 100%;
  min-height: 340px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  svg {
    color: red;
    font-size: 40px;
    margin-bottom: 20px;
  }
  p:nth-child(2) {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
  }
}

</style>

<script>
export default {
  name: 'modal-error',
  computed: {
    showError: function () {
      return this.$store.state.showError
    },
    title: function () {
      return this.$store.state.err.title
    },
    data: function () {
      return this.$store.state.err.msg
    }
  },
  methods: {
    closeError: function () {
      this.$store.commit('closeError')
    }
  }
}
</script>
