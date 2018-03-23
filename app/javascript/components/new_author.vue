<template lang="pug">
  #new-author
    h2 Add new author
    hr
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
          button.btn.btn-block.btn-outline-success(@click='add_author()') save author
      br
      .row
        .col-md-6.offset-md-6
          .form-check.text-right
            input#back.form-check-input(v-model='back_to_list', type='checkbox')
            label.text-info.font-weight-bold.form-check-label(for='back') back to authors list on save
    hr
    router-link.text-info.font-weight-bold(to='/') back to authors list
</template>

<script>
import Author from '../api/author';

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
      back_to_list: false
    };
  },
  methods: {
    add_author() {
      Author.add(this.author).then(response => {
        let route = `/show/${response.id}`;
        if (this.back_to_list) {
          route = '/';
        }
        this.$router.push({ path: route });
      }).catch(error => {
        this.errors = error;
      });
    }
  },
  created() {
    this.back_to_list = this.$store.state.back_to_list;
  },
  watch: {
    back_to_list: function (newValue) {
      this.$store.commit('back_to_list', newValue);
    }
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

.form-check input {
  cursor: pointer;
}

.form-check label {
  cursor: pointer;
}
</style>
