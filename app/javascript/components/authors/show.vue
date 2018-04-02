<template lang="pug">
  #show
    app-error(v-if='notFound')
    div(v-else)
      h2 Author's details
      hr
      br
      .row
        .col-md-6
          p.text-secondary.font-italic Registered at {{ createdAt }}
        .col-md-6
          p.text-right.text-secondary.font-italic Last updated at {{ updatedAt }}
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
import { logged, redirect } from '../../util/mixins';

export default {
  mixins: [logged, redirect],
  data() { return { author: { }, notFound: false } },
  components: { AppError },
  methods: {
    getAuthor() {
      Author.find(this.$route.params.id)
        .then(response => this.author = response)
        .catch(error => {
          if (error.status === this.$status.notFound) {
            this.notFound = true;
          } else if (error.status === this.$status.unauthorized) {
            this.goToAuthPage();
          }
        });
    },
    deleteAuthor() {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        Author.destroy(this.author.id)
          .then(response => this.$router.push('/'))
          .catch(error => {
            if (error.status === this.$status.unauthorized) {
              this.goToAuthPage();
            }
            this.$router.push({ name: 'home' });
          });
      }
    },
    dateToHuman(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
    }
  },
  computed: {
    createdAt() {
      return this.dateToHuman(this.author.created_at);
    },
    updatedAt() {
      return this.dateToHuman(this.author.updated_at);
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
