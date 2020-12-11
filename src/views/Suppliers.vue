<template>
  <div class="supplier">
    <h1>This is a suppliers page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Suppliers',
  components: {
  },
  data() {
    return {
      sampleData: 'Im a sample data',
    };
  },
  methods: {
    someFunc() {
      console.log('this is someFunc()');
    },
  },
};
</script>

<style scoped>

</style>
