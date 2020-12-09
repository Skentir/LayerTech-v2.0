<template>
  <div class="employees">
    <PageTemplate :title="title" :description="description" :addLabel="addLabel"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PageTemplate from '@/components/PageTemplate.vue';

export default {
  name: 'Employees',
  components: {
    PageTemplate,
  },
  data() {
    return {
      title: 'Employees',
      description: ' This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page This is the employees page ',
      addLabel: 'Add Employee',
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
