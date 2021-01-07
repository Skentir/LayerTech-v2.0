<template>
  <div class="operations">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <v-data-table
        :headers="this.componentData[0].headers"
        :items="this.componentData[0].data"
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
            <!-- main dialog -->
            <v-dialog
              id="form"
              v-model="showDialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
              <v-col class="text-right pr-0">
                <v-btn
                  id="add_item_btn"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add item
                </v-btn>
              </v-col>
            </template>
            <v-card>
              <v-card-title>
                <span id="form_title" class="headline">Add item to inventory</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                      <v-text-field
                        id="item_name_text_field"
                        v-model="editedItem.item_name"
                        label="Item Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        id="product_type_text_field"
                        v-model="editedItem.product_type"
                        label="Product Type"
                        hint="e.g. vaccine, feeds, etc."
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        id="quantity_text_field"
                        v-model="editedItem.quantity"
                        label="Quantity"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        id="unit_text_field"
                        v-model="editedItem.unit"
                        label="Unit"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-menu
                        ref="menu_date_exp"
                        v-model="menu_date_exp"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            id="date_exp_text_field"
                            v-model="editedItem.date_exp"
                            label="Expiration Date"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            v-bind="attrs"
                            @blur="date = parseDate(dateFormatted)"
                            v-on="on"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          id="date_exp_datepicker"
                          v-model="editedItem.date_exp"
                          no-title
                          @input="menu_date_exp = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-menu
                        ref="menu_date_received"
                        v-model="menu_date_received"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            id="date_received_text_field"
                            v-model="editedItem.date_received"
                            label="Received Date"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            v-bind="attrs"
                            @blur="date = parseDate(dateFormatted)"
                            v-on="on"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          id="date_received_datepicker"
                          v-model="editedItem.date_received"
                          no-title
                          @input="menu_date_received = false"
                        ></v-date-picker>
                      </v-menu>
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
            id="edit_item_btn"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
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
import operationsData from '@/models/operations.json';
import Navbar from '@/components/layout/Navbar.vue';

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
    showDialog: false,
    dialogDelete: false,
    componentData: [],
    editedIndex: -1,
    editedItem: {
      item_name: '',
      product_type: '',
      quantity: 0,
      unit: 0,
      date_exp: new Date().toISOString().substr(0, 10),
      date_received: new Date().toISOString().substr(0, 10),
      dosage: '',
    },
    defaultItem: {
      item_name: '',
      product_type: '',
      quantity: 0,
      unit: 0,
      date_exp: new Date().toISOString().substr(0, 10),
      date_received: new Date().toISOString().substr(0, 10),
      dosage: '',
    },
    date: new Date().toISOString().substr(0, 10),
    menu_date_exp: false,
    menu_date_received: false,
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
    /*
      Assigns fetched data to local reference inside the component
    */
    initialize() {
      this.componentData = operationsData;
    },
    /*
      Copies the data to editedItem to display on dialog.
      showDialog triggers the dialog view of the form.
    */
    editItem(item) {
      // get index of item
      this.editedIndex = this.componentData[0].data.indexOf(item);
      // assign item to editedItem obj
      this.editedItem = { ...item };
      // format string to date
      this.editedItem.date_exp = new Date(this.editedItem.date_exp).toISOString().substr(0, 10);
      // set true to show dialog view
      this.showDialog = true;
    },
    /*
      Closes the dialog and resets editedItem
      to defaultItem. Also resets editedIndex to -1.
    */
    close() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    /*
      Pushers the object to the source data
      or update the existing object with new data.
    */
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.componentData[0].data[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line prefer-template
        this.editedItem.item_id = '0' + (this.componentData[0].data.length + 1).toString();
        this.componentData[0].data.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>