<template lang="pug">
  #show
    h2 Author's details
    hr
    p.text-right.text-secondary.font-italic Registered at {{ createdDate(author.created_at) }}
    p.text-right.text-secondary.font-italic Last updated at {{ createdDate(author.updated_at) }}
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
    .row
      .col-md-6
        router-link.btn.btn-outline-info.btn-block(:to='"/edit/" + author.id') edit author
      .col-md-6
        button.btn.btn-outline-danger.btn-block(@click='deleteAuthor()') delete author
    hr
    router-link.font-weight-bold.text-info(to='/') back to authors list
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() { return { author: {  } } },
  methods: {
    getAuthor() {
      axios.get(`/v1/authors/${this.$route.params.id}.json`)
        .then(response => this.author = response.data);
    },
    deleteAuthor() {
      let isSure = confirm('Delete author from database?');
      if (isSure) {
        axios.delete(`/v1/authors/${this.author.id}.json`)
          .then(response => this.$router.push('/'));
      }
    },
    createdDate(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
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

.btn {
  border-radius: 0px;
}
</style>
