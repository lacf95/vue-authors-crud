<template lang="pug">
  #app-auth
    .row
      .col-md-6
        sign-up
      .col-md-6
        sign-in
</template>

<script>
import SignIn from './sign_in';
import SignUp from './sign_up';

export default {
  components: {
    SignIn,
    SignUp
  },
  created() {
    this.$store.commit('user');
  }
}
</script>

<style scoped>
</style>
