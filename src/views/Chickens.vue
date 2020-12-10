<template>
  <div class="chickens">
    <PageTemplate :pageInfo="pageInfo"/>
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
import chickensData from '@/models/chickens.json';

export default {
  name: 'Chickens',
  components: {
    Table,
    PageTemplate,
  },
  data() {
    return {
      pageInfo: {
        title: 'Chickens',
        description: ' This page is solely for chickens This page is solely for chickens This page is solely for chickens This page is solely for chickens This page is solely for chickens This page is solely for chickens This page is solely for chickens ',
      },
      componentData: chickensData,
      tableTitle: 'Chickens',
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
