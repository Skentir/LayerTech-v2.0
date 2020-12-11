<template>
  <div class="employees">
    <PageTemplate :pageInfo="pageInfo"/>
  </div>
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import employeeData from '@/models/employees.json';

export default {
  name: 'Employees',
  components: {
    PageTemplate,
  },
  data() {
    return {
      pageInfo: {
        title: 'Employees',
        description: ' This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees This is the employees',
      },
      componentData: employeeData,
      tableTitle: 'Employees',
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
