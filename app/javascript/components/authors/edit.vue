<template lang="pug">
  #edit-author
    app-error(v-if='notFound')
    div(v-else)
      h2 Edit author
      hr
      br
      div
        .form-group.row
          label.col-md-2 First name
          .col-md-10
            input.form-control(v-model='author.first_name', placeholder='John')
        .row
          .col-md-10.offset-md-2
            p.small.text-danger(v-for='error in errors.first_name') First name {{ error }}
        .form-group.row
          label.col-md-2 Last name
          .col-md-10
            input.form-control(v-model='author.last_name', placeholder='Smith')
        .row
          .col-md-10.offset-md-2
            p.small.text-danger(v-for='error in errors.last_name') Last name {{ error }}
        .form-group.row
          label.col-md-2 Email
          .col-md-10
            input.form-control(v-model='author.email', placeholder='john_smith@mail.com')
        .row
          .col-md-10.offset-md-2
            p.small.text-danger(v-for='error in errors.email') Email {{ error }}
        .form-group.row
          label.col-md-2 Nationality
          .col-md-10
            input.form-control(v-model='author.nationality', placeholder='american')
        .row
          .col-md-10.offset-md-2
            p.small.text-danger(v-for='error in errors.nationality') Nationality {{ error }}
        .row
          .col-md-6.offset-md-6
            button.btn.btn-block.btn-outline-success(@click='updateAuthor()') update author
      hr
      router-link.text-info.font-weight-bold(:to='{ name: "home" }') back to authors list
      br
      router-link.text-info.font-weight-bold(v-if='author.id', :to='{ name: "authorsShow", params: { id: author.id } }') back to author page
</template>

<script>
import Author from '../../api/author';
import AppError from '../app_error';
import { logged, redirect } from '../../util/mixins';

export default {
  mixins: [redirect, logged],
  data() {
    return {
      author: {
        first_name: '',
        last_name: '',
        email: '',
        nationality: ''
      },
      errors: {},
      notFound: false
    };
  },
  components: { AppError },
  methods: {
    updateAuthor() {
      Author.update(this.author)
        .then(response => {
          this.backToLastPage();
        }).catch(error => {
          if (error.status === this.$status.notFound) {
            this.notFound = true;
          }
          this.errors = error.messages;
        });
    },
    getAuthor() {
      Author.find(this.$route.params.id)
        .then(response => this.author = response)
        .catch(error => {
          if (error.status === this.$status.notFound) {
            this.notFound = true;
          }
        });
    }
  },
  created() {
    if (!this.logged) {
      this.$router.push({ name: 'signIn' });
    }
    this.getAuthor();
  },
  watch: {
    logged: function(val) {
      if (!this.logged) {
        this.goToAuthPage();
      }
    }
  }
}
</script>

<style scoped>
</style>
