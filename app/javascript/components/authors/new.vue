<template lang="pug">
  #new-author
    h2 Add new author
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
          button.btn.btn-block.btn-outline-success(@click='addAuthor()') save author
      br
      .row
        .col-md-6.offset-md-6
          .form-check.text-right
            input#back.form-check-input(v-model='backToList', type='checkbox')
            label.text-info.font-weight-bold.form-check-label(for='back') back to authors list on save
    hr
    router-link.text-info.font-weight-bold(:to='{ name: "home" }') back to authors list
</template>

<script>
import Author from '../../api/author';
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
      backToList: false
    };
  },
  methods: {
    addAuthor() {
      Author.add(this.author)
        .then(response => {
          this.$router.push(this.backRoute(response.id));
        }).catch(error => {
          if (error.status === this.$status.unauthorized) {
            this.goToAuthPage();
          }
          this.errors = error.messages;
        });
    },
    backRoute(author_id) {
      const route = {
        name: 'home',
        params: {}
      }
      if (!this.backToList) {
        route.name = 'authorsShow';
        route.params = { id: author_id }
      }
      return route;
    }
  },
  created() {
    if (!this.logged) {
      this.goToAuthPage();
    }
    this.backToList = this.$store.state.backToList;
  },
  watch: {
    backToList: function (newValue) {
      this.$store.commit('backToList', newValue);
    },
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
