<template>
  <v-card class='card'>
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
      :items-per-page="10"
      :footer-props="footerProps"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="false"
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Table',
  /*
    Props coming from parent component.
    tableTitle (String) - Title of the table/card
    tableData (array of objects) - data to be displayed
    tableCols (array of objects) - header titles
    format:
      required (bare minimum):
        {
          "text": "calories",
          "value":"calories"
        }
        where text is the display string, value is the reference key used by objects in
        tableData
      other option:
        {
          "text": "Dessert (100g serving)",
          "align": "start",
          "sortable": false,
          "value": "name"
        }
      sortable, align is an example of props used by the v-data-table component

      For more info on v-data-table props: https://vuetifyjs.com/en/api/v-data-table/#props
  */
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  data() {
    return {
      showDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      footerProps: { 'items-per-page-options': [5, 10, 15, 30, 50, 100] },
      search: '',
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.showDialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },
  },
};
</script>

<style  scoped>
</style>
