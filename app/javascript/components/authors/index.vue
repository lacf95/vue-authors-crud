<template lang="pug">
  #authors-index
    .row
      .col-md-6
        h2 Authors listed by last name
      .col-md-4.offset-md-2
        template(v-if='logged')
          router-link.btn.btn-block.btn-outline-success(:to='{ name: "authorsNew" }') add new author
    hr
    br
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
              router-link.font-weight-bold.text-info(:to='{ name: "authorsShow", params: { id: author.id } }') show
            template(v-if='logged')
              span.text-secondary |
              span
                router-link.font-weight-bold.text-info(:to='{ name: "authorsEdit", params: {id: author.id} }') edit
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
    deleteAuthor(authorId) {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        Author.destroy(authorId)
          .then(response => this.getAuthors())
          .catch(error => {
            if (error.status === this.$status.unauthorized) {
              this.$router.push({ name: 'signIn' });
            }
            this.getAuthors();
          });
      }
    }
  },
  computed: {
    logged: function() {
      return (this.$store.state.user);
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
</style>
