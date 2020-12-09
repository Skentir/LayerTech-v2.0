<template>
  <div class="chickens">
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
import chickenData from '@/models/chickens.json';

export default {
  name: 'Employees',
  components: {
    Table,
    PageTemplate,
  },
  data() {
    return {
      title: 'Chickens',
      description: ' This page is solely about chickens This page is solely about chickens This page is solely about chickens This page is solely about chickens This page is solely about chickens ',
      addLabel: 'Add Chicken',
      tableTitle: 'Chickens',
      componentData: chickenData,
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
