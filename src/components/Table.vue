<template>
  <div class="table">
    <h1>This is a table component</h1>
  </div>
</template>

<script>
// import modules
// import EventList from '@/components/EventList'

export default {
  name: 'Suppliers',
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
