<template lang="pug">
  #sign-up
    .row
      .col-md-10.offset-md-1
        h2 Create a new account
        hr
        .form-group
          label First name
          input.form-control(type='text', placeholder='John', v-model='user.first_name')
          template(v-if='errors.first_name')
            br
          p.small.text-danger(v-for='error in errors.first_name') First name {{ error }}
        .form-group
          label Last name
          input.form-control(type='text', placeholder='Smith', v-model='user.last_name')
          template(v-if='errors.last_name')
            br
          p.small.text-danger(v-for='error in errors.last_name') Last name {{ error }}
        .form-group
          label Email
          input.form-control(type='email', placeholder='john_smith@mail.com', v-model='user.email')
          template(v-if='errors.email')
            br
          p.small.text-danger(v-for='error in errors.email') Email {{ error }}
        .form-group
          label Password
          input.form-control(type='password', v-model='user.password')
          template(v-if='errors.password')
            br
          p.small.text-danger(v-for='error in errors.password') Password {{ error }}
        br
        .form-group
          button.btn.btn-outline-primary(@click='signUp()') Sign up
</template>

<script>
import Auth from '../../api/auth';

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
        first_name: null,
        last_name: null
      },
      errors: {}
    };
  },
  methods: {
    signUp() {
      Auth.signUp(this.user)
        .then(response => {
          this.$store.commit('user', response);
          this.$router.push({ path: this.$store.state.lastPage });
        })
        .catch(error => {
          if (error.status === this.$status.badRequest) {
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
