<template lang="pug">
  #sign-in
    .row
      .col-md-10.offset-md-1
        h2 Sign in with an existing account
        hr
        .form-group
          label Email
          input.form-control(type='email', placeholder='john_smith@mail.com', v-model='credential.email')
        .form-group
          label Password
          input.form-control(type='password', v-model='credential.password')
          template(v-if='errors.credentials')
            br
          p.small.text-danger(v-for='error in errors.credentials') {{ error }}
        br
        .form-group
          button.btn.btn-outline-success(@click='signIn()') Sign in
</template>

<script>
import Auth from '../../api/auth';
import { redirect } from '../../util/mixins';

export default {
  mixins: [redirect],
  data() {
    return {
      credential: {
        email: null,
        password: null
      },
      errors: {}
    };
  },
  methods: {
    signIn() {
      Auth.signIn(this.credential)
        .then(response => {
          this.$store.commit('user', response);
          this.backToLastPage();
        })
        .catch(error => {
          if (error.status === this.$status.unauthorized) {
            this.errors = error.messages;
          }
        });
    }
  }
}
</script>

<style scoped>
.form-control, button {
  border-radius: 0px;
}
</style>
