<template lang="pug">
  #app.container
    app-header
    router-view#content
    app-footer
</template>

<script>
import feather from 'feather-icons';
import AppHeader from './components/app_header';
import AppFooter from './components/app_footer';
import router from './config/router'

export default {
  router,
  mounted() {
    feather.replace();
  },
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

@import url('https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700');

* {
  font-family: 'Crimson Text', serif;
}

.btn {
  border-radius: 0px;
}

input {
  border-radius: 0px!important;
}

.form-check input {
  cursor: pointer;
}

.form-check label {
  cursor: pointer;
}
</style>

<style scoped>
#content {
  margin-bottom: 50px;
}
</style>
