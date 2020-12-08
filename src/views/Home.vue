<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
import dessertData from '@/models/desserts.json';

export default {
  name: 'Home',
  components: {
    Table,
  },
  data() {
    return {
      tableTitle: 'Nutrition',
      componentData: dessertData,
    };
  },
  mounted() {
    console.log(this.componentData[0].data);
  },
};
</script>
