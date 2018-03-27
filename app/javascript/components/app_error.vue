<template lang="pug">
  #error
    h2 Sorry but this author does not exist
    hr
    router-link(:to='{ name: "home" }') back to authors list
</template>

<script>
export default { }
</script>

<style scoped>
</style>
