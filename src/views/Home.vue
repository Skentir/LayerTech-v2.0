<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';

export default {
  name: 'Home',
  components: {
    Table,
  },
};
</script>
