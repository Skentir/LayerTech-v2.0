<template>
  <div class="home">
    <PageTemplate :title="title" :description="description" :addLabel="addLabel"/>
    <Form></Form>
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
import operationsData from '@/models/operations.json';
import Form from '@/components/FormOperations.vue';

export default {
  name: 'Operations',
  components: {
    Table,
    PageTemplate,
    Form,
  },
  data() {
    return {
      title: 'Operations',
      description: ' This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page This is the operations page ',
      addLabel: 'Add item',
      tableTitle: 'Inventory',
      componentData: operationsData,
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
