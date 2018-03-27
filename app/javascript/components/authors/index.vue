<template lang="pug">
  #authors-index
    h2 Authors listed by last name
    template(v-if='logged')
      hr
      .row
        .col-md-4.offset-md-4
         router-link.btn.btn-block.btn-outline-success(to='/new') add new author
    hr
    table.table.table-hover
      thead
        tr.bg-danger.text-light
          th Last name
          th First name
          th Email
          th Nationality
          th Actions
      tbody
        tr(v-for='author in authors')
          td {{ author.last_name }}
          td {{ author.first_name }}
          td {{ author.email }}
          td {{ author.nationality }}
          td
            span
              router-link.font-weight-bold.text-info(:to='getShowRute(author.id)') show
            template(v-if='logged')
              span.text-secondary |
              span
                router-link.font-weight-bold.text-info(:to='getEditRute(author.id)') edit
              span.text-secondary |
              span
                a.font-weight-bold.text-danger(href='', @click.prevent='deleteAuthor(author.id)') delete
</template>

<script>
import Author from '../../api/author';

export default {
  data() {
    return {
      authors: [],
      errors: {}
    }
  },
  methods: {
    getAuthors() {
      Author.all()
        .then(authors => this.authors = authors)
        .catch(error => {
          this.errors = error.messages;
        });
    },
    getShowRute(authorId) {
      return `/show/${authorId}`;
    },
    getEditRute(authorId) {
      return `/edit/${authorId}`;
    },
    deleteAuthor(authorId) {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        Author.destroy(authorId)
          .then(response => this.getAuthors())
          .catch(error => {
            if (error.status === this.$status.unauthorized) {
              console.log('sin auth');
            }
            this.getAuthors();
          });
      }
    }
  },
  computed: {
    logged: function() {
      return (this.$Session.getValue('token'));
    }
  },
  created() {
    this.getAuthors();
  }
};
</script>

<style scoped>
  span {
    margin-right: 5px;
  }

  .btn {
    border-radius: 0px;
  }
</style>
