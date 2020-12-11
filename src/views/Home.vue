<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

import dessertData from '@/models/desserts.json';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      tableTitle: 'Nutrition',
      componentData: dessertData,
    };
  },
};
</script>
