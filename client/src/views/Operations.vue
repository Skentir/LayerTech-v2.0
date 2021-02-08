<template>
  <div class="operations">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <v-data-table
        :headers="headers"
        :items="this.componentData"
        :search="search"
        sort-by="date_received"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title id="table_title">{{tableTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              id="table_search_bar"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.received_date`]="{ item }">
          {{convertDate(item.received_date)}}
        </template>
        <template v-slot:[`item.expiration_date`]="{ item }">
          {{convertDate(item.expiration_date)}}
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="reset"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-footer id="footer">
    </v-footer>
  </div>
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import Navbar from '@/components/layout/Navbar.vue';
import axios from 'axios';

const url = process.env.VUE_APP_API_URL;

export default {
  components: {
    PageTemplate,
    Navbar,
  },
  data: () => ({
    pageInfo: {
      title: 'Operations',
      description: 'Track inventory of operations here. This page contains pulled out items from the warehouse.',
    },
    search: '',
    tableTitle: 'Inventory',
    componentData: [],
    headers: [
      { text: 'Batch Number', value: 'batch_number' },
      { text: 'Product Status', value: 'product_status' },
      { text: 'Serial ID', value: 'serial_id' },
      { text: 'Supplier', value: 'supplier' },
      { text: 'Product Title', value: 'product_title' },
      { text: 'Product Type', value: 'product_type' },
      { text: 'Product Code', value: 'product_code' },
      { text: 'Dosage', value: 'dosage' },
      { text: 'Date Received', value: 'received_date' },
      { text: 'Expiration Date', value: 'expiration_date' },
      { text: 'Product Assignment', value: 'product_assignment' },
      { text: 'Unit', value: 'unit' },
      { text: 'Packaging', value: 'packaging' },
      { text: 'Entry', value: 'entry' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Original Quantity', value: 'original_quantity' },
      { text: 'Small Eggs Sold', value: 'eggs_sold_s' },
      { text: 'Medium Eggs Sold', value: 'eggs_sold_m' },
      { text: 'Large Eggs Sold', value: 'eggs_sold_l' },
    ],
  }),
  async mounted() {
    const response = await axios.get(`${url}/operations/`);
    this.componentData = response.data;
    console.log(this.componentData);
  },
  methods: {
    /*
      For proper date formatting within the table
    */
    convertDate(date) {
      return new Date(date).toISOString().substr(0, 10);
    },
    async reset() {
      const response = await axios.get(`${url}/operations/`);
      this.componentData = response.data;
    }
  },
};
</script>
