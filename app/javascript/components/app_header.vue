<template lang="pug">
  #app-header.row
    .col-md-12
      .app-header-line
        h1.display-4.text-center
          router-link.text-dark(:to='{ name: "home" }')
            i(data-feather='book-open')
            | Authors
    .col-md-12
      .app-header-line
        .row
          #auth-control.col-md-12
            template(v-if='logged')
              h6.text-right
                span.font-weight-bold {{ username }}
                span.separator 
                a.text-danger(href='', @click.prevent='signOut()') sign out
            template(v-else)
                h6.text-right
                  | To access all features, 
                  router-link.text-info(:to='{ name: "signIn" }') Sign in
</template>

<script>
import { logged } from '../util/mixins';

export default {
  mixins: [logged],
  computed: {
    username: function() {
      return `${this.$store.state.user.first_name} ${this.$store.state.user.last_name}`;
    }
  },
  methods: {
    signOut() {
      this.$store.commit('user');
    }
  },
}
</script>

<style scoped>
.separator {
  margin: 0 5px;
}

#auth-control {
  padding-right: 30px;
}

.app-header-line {
  border-bottom: 1px solid #17a2b8;
}

.app-menu-separator {
  border-right: 1px solid #17a2b8;
}

#app-header {
  margin-bottom: 60px;
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
