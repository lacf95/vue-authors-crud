<template lang="pug">
  #show
    app-error(v-if='not_found')
    div(v-else)
      h2 Author's details
      hr
      p.text-right.text-secondary.font-italic Registered at {{ date_to_human(author.created_at) }}
      p.text-right.text-secondary.font-italic Last updated at {{ date_to_human(author.updated_at) }}
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
          button.btn.btn-outline-danger.btn-block(@click='delete_author()') delete author
      hr
      router-link.font-weight-bold.text-info(to='/') back to authors list
</template>

<script>
import Author from '../api/author';
import moment from 'moment';
import AppError from './app_error';

export default {
  data() { return { author: { }, not_found: false } },
  components: { AppError },
  methods: {
    get_author() {
      Author.find(this.$route.params.id)
        .then(response => this.author = response)
        .catch(error => {
          if (error.status === 404) {
            this.not_found = true;
          }
        });
    },
    delete_author() {
      let is_sure = confirm('Delete author from database?');
      if (is_sure) {
        Author.destroy(this.author.id)
          .then(response => this.$router.push('/'))
          .catch(error => {
            this.$router.push('/');
          });
      }
    },
    date_to_human(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
    }
  },
  created() {
    this.get_author();
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
