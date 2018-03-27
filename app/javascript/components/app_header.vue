<template lang="pug">
  #app-header
    .row
      .col-md-12
          h1.display-4.text-center
            router-link.text-dark(to='/')
              i(data-feather='book-open')
              | Authors
    .row
      .col-md-12.text-right
        template(v-if='logged')
          h6
            span.font-weight-bold {{ username }}
            span.text-secondary |
            a.text-danger(href='', @click.prevent='signOut()') sign out
        template(v-else)
          h6
            | To access all features, 
            router-link.text-info(to='/sign-in') Sign in
</template>

<script>
export default {
  computed: {
    logged: function() {
      return (this.$store.state.user);
    },
    username: function() {
      return `${this.$store.state.user.first_name} ${this.$store.state.user.last_name}`;
    }
  },
  methods: {
    signOut() {
      this.$store.commit('user');
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
span {
  margin-right: 5px;
}

#app-header .col-md-12 {
  border-bottom: 1px solid #17a2b8;
}

#app-header {
  margin-bottom: 30px;
}

h6 {
  padding-top: 8px;
}

svg {
  width: 34px;
  height: 34px;
  stroke: #dc3545;
  margin-right: 6px;
}
</style>
