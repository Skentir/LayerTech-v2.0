<template>
  <div class="suppliers">
    <PageTemplate :pageInfo="pageInfo"/>
    <addSupplier/>
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
import suppliersData from '@/models/employees.json';
import addSupplier from '@/components/FormSupplier.vue';

export default {
  name: 'Suppliers',
  components: {
    Table,
    PageTemplate,
    addSupplier,
  },
  data() {
    return {
      pageInfo: {
        title: 'Suppliers',
        description: ' This page is solely for suppliers This page is solely for suppliers This page is solely for suppliers This page is solely for suppliers This page is solely for suppliers This page is solely for suppliers This page is solely for suppliers ',
      },
      componentData: suppliersData,
      tableTitle: 'Suppliers',
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
