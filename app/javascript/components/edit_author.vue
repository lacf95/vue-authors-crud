<template lang="pug">
  #edit-author
    app-error(v-if='not_found')
    div(v-else)
      h2 Edit author
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
            button.btn.btn-block.btn-outline-success(@click='update_author()') update author
      hr
      router-link.text-info.font-weight-bold(to='/') back to authors list
      br
      router-link.text-info.font-weight-bold(:to='"/show/" + author.id') back to author page
</template>

<script>
import Author from '../api/author';
import AppError from './app_error';

export default {
  data() {
    return {
      author: {
        first_name: '',
        last_name: '',
        email: '',
        nationality: ''
      },
      errors: {},
      not_found: false
    };
  },
  components: { AppError },
  methods: {
    update_author() {
      Author.update(this.author)
        .then(response => {
          this.$router.push({ path: this.$store.state.last_page });
        }).catch(error => {
          if (error.status === 404) {
            this.not_found = true;
          }
          this.errors = error.messages;
        });
    },
    get_author() {
      Author.find(this.$route.params.id)
        .then(response => this.author = response)
        .catch(error => {
          if (error.status === 404) {
            this.not_found = true;
          }
        });
    }
  },
  created() {
    this.get_author();
  }
}
</script>

<style scoped>
.btn {
  border-radius: 0px;
}

input {
  border-radius: 0px;
}
</style>
