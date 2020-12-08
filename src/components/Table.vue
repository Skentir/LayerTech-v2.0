<template>
  <v-card>
    <v-card-title>
      {{tableTitle}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="tableCols"
      :items="tableData"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableTitle: {
      default: 'tableTitle',
      type: String,
    },
    tableData: {
      default: null,
      type: Array,
    },
    tableCols: {
      default: null,
      type: Array,
    },
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>
