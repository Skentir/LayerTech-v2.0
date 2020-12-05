<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <b-alert show>Default Alert</b-alert> <!-- this is a bootstrap vue component -->
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
