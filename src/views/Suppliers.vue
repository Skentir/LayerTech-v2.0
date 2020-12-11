<template>
  <div class="Suppliers">
    <PageTemplate :pageInfo="pageInfo"/>
    <v-data-table
      :headers="this.componentData[0].headers"
      :items="this.componentData[0].data"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{tableTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <!-- main dialog -->
          <v-dialog
            v-model="showDialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
            <v-col class="text-right pr-0">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Add Supplier
              </v-btn>
            </v-col>
          </template>
          <v-card>
      <v-card-title>
        <span class="headline">Add a new Supplier</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.supplier_name"
                label="Supplier Name" required/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.files_link"
                label="Supplier Files Link" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.contact_num"
                label="Contact Number" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.email"
                label="Email" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.company_name"
                label="Company Name" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.position"
                label="Position in Company" required/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="showDialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
          </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import SuppliersData from '@/models/suppliers.json';

export default {
  components: {
    PageTemplate,
  },
  data: () => ({
    pageInfo: {
      title: 'Suppliers',
      description: ' This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page This is the Suppliers page ',
    },
    search: '',
    tableTitle: 'Suppliers',
    showDialog: false,
    dialogDelete: false,
    componentData: [],
    editedIndex: -1,
    editedItem: {
      supplier_name: '',
      files_link: '',
      contact_num: '',
      email: '',
      company_name: '',
      position: '',
    },
    defaultItem: {
      supplier_name: '',
      files_link: '',
      contact_num: '',
      email: '',
      company_name: '',
      position: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  watch: {
    showDialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.componentData = SuppliersData;
    },
    editItem(item) {
      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.componentData[0].data[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line prefer-template
        this.componentData[0].data.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
