<template>
  <div class="supplier">
    <h1>This is a suppliers page</h1>
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';

export default {
  name: 'Suppliers',
  components: {
    Table,
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
