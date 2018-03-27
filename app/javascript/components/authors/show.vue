<template lang="pug">
  #show
    app-error(v-if='notFound')
    div(v-else)
      h2 Author's details
      hr
      br
      .row
        .col-md-6
          p.text-secondary.font-italic Registered at {{ dateToHuman(author.created_at) }}
        .col-md-6
          p.text-right.text-secondary.font-italic Last updated at {{ dateToHuman(author.updated_at) }}
      hr
      .row
        .col-md-6
          p.small.text-secondary First name
          p.lead.bg-light {{ author.first_name }}
        .col-md-6
          p.small.text-secondary Last name
          p.lead.bg-light  {{ author.last_name }}
      br
      .row
        .col-md-6
          p.small.text-secondary Email
          p.lead.bg-light {{ author.email }}
        .col-md-6
          p.small.text-secondary Nationality
          p.lead.bg-light {{ author.nationality }}
      br
      .row(v-if='logged')
        .col-md-6(v-if='author.id')
          router-link.btn.btn-outline-info.btn-block(:to='{ name: "authorsEdit", params: { id: author.id } }') edit author
        .col-md-6
          button.btn.btn-outline-danger.btn-block(@click='deleteAuthor()') delete author
      hr
      router-link.font-weight-bold.text-info(:to='{ name: "home" }') back to authors list
</template>

<script>
import Author from '../../api/author';
import moment from 'moment';
import AppError from '../app_error';

export default {
  data() { return { author: { }, notFound: false } },
  components: { AppError },
  methods: {
    getAuthor() {
      Author.find(this.$route.params.id)
        .then(response => this.author = response)
        .catch(error => {
          if (error.status === this.$status.notFound) {
            this.notFound = true;
          }
        });
    },
    deleteAuthor() {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        Author.destroy(this.author.id)
          .then(response => this.$router.push('/'))
          .catch(error => {
            this.$router.push('/');
          });
      }
    },
    dateToHuman(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
    }
  },
  computed: {
    logged: function() {
      return (this.$store.state.user);
    }
  },
  created() {
    this.getAuthor();
  }
};
</script>

<style scoped>
.bg-light {
  padding: 4px 8px;
  background-color: #dedede!important;
}
</style>