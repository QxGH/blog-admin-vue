<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Tag</h2>
    
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {
      msg: 'Admin-Tag'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
