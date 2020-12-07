<template>
  <div class="employees">
    <PageTemplate :title="title" :description="description" :addLabel="addLabel"/>
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';
import PageTemplate from '@/components/PageTemplate.vue';

export default {
  name: 'Employees',
  components: {
    Table,
    PageTemplate,
  },
  data() {
    return {
      title: 'Employees',
      description: ' This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page ',
      addLabel: 'Employee',
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
