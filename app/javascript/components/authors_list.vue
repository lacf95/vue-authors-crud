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
              router-link.font-weight-bold.text-info(:to='get_show_rute(author.id)') show
            span.text-secondary |
            span
              router-link.font-weight-bold.text-info(:to='get_edit_rute(author.id)') edit
            span.text-secondary |
            span
              a.font-weight-bold.text-danger(href='', @click.prevent='delete_author(author.id)') delete
</template>

<script>
import Author from '../api/author';

export default {
  data() {
    return {
      authors: []
    }
  },
  methods: {
    get_authors() {
      Author.all().then(authors => this.authors = authors);
    },
    get_show_rute(author_id) {
      return `/show/${author_id}`;
    },
    get_edit_rute(author_id) {
      return `/edit/${author_id}`;
    },
    delete_author(author_id) {
      let is_sure = confirm('Delete author from database?');
      if (is_sure) {
        Author.destroy(author_id)
          .then(response => this.get_authors())
          .catch(error => this.get_authors());
      }
    }
  },
  created() {
    this.get_authors();
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
