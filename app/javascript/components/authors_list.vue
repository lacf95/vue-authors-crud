<template lang="pug">
  #authors-list
    h2 Authors listed by last name
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
              router-link.font-weight-bold.text-info(:to='getShowRoute(author.id)') show
            span.text-secondary |
            span
              router-link.font-weight-bold.text-info(:to='getEditRoute(author.id)') edit
            span.text-secondary |
            span
              a.font-weight-bold.text-danger(href='', @click.prevent='deleteAuthor(author.id)') delete
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      authors: []
    }
  },
  methods: {
    getAuthors() {
      axios.get('/v1/authors.json')
        .then(response => this.authors = response.data);
    },
    getShowRoute(author_id) {
      return `/show/${author_id}`;
    },
    getEditRoute(author_id) {
      return `/edit/${author_id}`;
    },
    deleteAuthor(author_id) {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        axios.delete(`/v1/authors/${author_id}.json`)
          .then(response => this.getAuthors())
          .catch(error => this.getAuthors());
      }
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
