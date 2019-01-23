<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Type</h2>
    
  </div>
</template>

<script>
export default {
  name: 'Type',
  data () {
    return {
      msg: 'Admin-Type'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
