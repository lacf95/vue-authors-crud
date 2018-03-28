const logged = {
  computed: {
    logged: function() {
      return (this.$store.state.user);
    }
  }
};

const redirect = {
  methods: {
    backToLastPage() {
      this.$router.push({
        name: this.$store.state.lastPage.name,
        params: this.$store.state.lastPage.params
      });
    },
    goToAuthPage() {
      this.$router.push({
        name: 'signIn'
      });
    }
  }
}

export { logged, redirect }
