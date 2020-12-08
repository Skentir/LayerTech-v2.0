<template>
  <div class="employees">
    <PageTemplate :title="title" :description="description" :addLabel="addLabel"/>
    <Table
      :tableData="this.componentData[0].data"
      :tableCols="this.componentData[0].headers"
      :tableTitle="tableTitle"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';
import PageTemplate from '@/components/PageTemplate.vue';
import employeeData from '@/models/employees.json';

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
      addLabel: 'Add Employee',
      tableTitle: 'Employees',
      componentData: employeeData,
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
