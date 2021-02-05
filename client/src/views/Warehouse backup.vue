<template>
  <div class="operations">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <!-- table, may add scrollbar/overflow if too tight -->
      <v-data-table
        :headers="this.headers"
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
            <!-- add item dialog -->
            <v-dialog
              id="form"
              v-model="showAddItemDialog"
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
                        cols="3"
                        sm="3"
                        md="3"
                      >
                        <v-text-field
                          id="stock_quantity_text_field"
                          v-model="editedItem.stock_quantity"
                          label="In Stock Quantity"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="3"
                        sm="3"
                        md="3"
                      >
                        <v-text-field
                          id="pulled_out_quantity_text_field"
                          v-model="editedItem.pulled_out_quantity"
                          label="Pulled Out Quantity"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="3"
                        sm="3"
                        md="3"
                      >
                        <v-text-field
                          id="liquidated_quantity_text_field"
                          v-model="editedItem.liquidated_quantity"
                          label="Liquidated Quantity"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="3"
                        sm="3"
                        md="3"
                      >
                        <v-text-field
                          id="critical_volume_text_field"
                          v-model="editedItem.critical_volume"
                          label="Critical Volume"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="6"
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
                      <v-col
                        cols="6"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          id="status_select_field"
                          v-model="editedItem.status"
                          :items="select_options_status"
                          label="Status"
                          required
                        ></v-select>
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
                  @click="showAddItemDialog = false"
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <v-list>
              <v-list-item
              >
                <!-- edit item dialog -->
                <v-dialog
                id="editForm"
                v-model="showEditDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="edit_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="editItem(item)"
                    >
                      Edit
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Edit Item
                    </v-card-title>
                    <v-card-text>
                      Edit item
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showEditDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showEditDialog=false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- add batch dialog -->
                <v-dialog
                id="addBatchForm"
                v-model="showAddBatchDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="add_batch_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="addNewBatch(item)"
                    >
                      Add New Batch
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Add New Batch
                    </v-card-title>
                    <v-card-text>
                      Add New Batch
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showAddBatchDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showAddBatchDialog=false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- liquidate dialog -->
                <v-dialog
                id="liquidateForm"
                v-model="showLiquidateDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="liquidate_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="liquidateItem(item)"
                    >
                      Liquidate
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Liquidate
                    </v-card-title>
                    <v-card-text>
                      Liquidate
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showLiquidateDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showLiquidateDialog=false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- pull out dialog -->
                <v-dialog
                id="pullOutForm"
                v-model="showPullOutDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="pull_out_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="pullItemOut(item)"
                    >
                      Pull Out
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Pull Out
                    </v-card-title>
                    <v-card-text>
                      Pull Out
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showPullOutDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="showPullOutDialog=false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="close"
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
      title: 'Warehouse',
      description: 'Track inventory of warehouse here. This page contains general information about all items within the farm.',
    },
    search: '',
    tableTitle: 'Inventory',
    showAddItemDialog: false,
    showEditDialog: false,
    showAddBatchDialog: false,
    showPullOutDialog: false,
    showLiquidateDialog: false,
    dialogDelete: false,
    componentData: [],
    headers: [
      {
        text: 'serial id', value: 'serial_id',
      },
      { text: 'product title', value: 'product_title' },
      { text: 'Product Type', value: 'product_type' },
      { text: 'Product Code', value: 'product_code' },
      { text: 'Dosage', value: 'dosage' },
      { text: 'Received Date', value: 'received_date' },
      { text: 'Expiration Date', value: 'expiration_date' },
      { text: 'Stock Quantity', value: 'stock_quantity' },
      { text: 'Critical Volume', value: 'critical_volume' },
      { text: 'Unit', value: 'unit' },
      { text: 'Packaging', value: 'packaging' },
      { text: 'Batch Number', value: 'batch_number' },
      { text: 'Batch Status', value: 'batch_status' },
      { text: 'Product Status', value: 'product_status' },
      { text: 'Pulled Out Quantity', value: 'pulled_out_quantity' },
      { text: 'Liquidated Quantity', value: 'liquidated_quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    select_options_status: ['In Stock', 'Out of Stock', 'Pulled Out', 'Liquidated'],
    editedItem: {
      item_name: '',
      product_type: '',
      stock_quantity: 0,
      pulled_out_quantity: 0,
      liquidated_quantity: 0,
      critical_volume: 0,
      unit: 0,
      status: '',
      date_exp: new Date().toISOString().substr(0, 10),
      date_received: new Date().toISOString().substr(0, 10),
      dosage: '',
    },
    defaultItem: {
      item_name: '',
      product_type: '',
      stock_quantity: 0,
      pulled_out_quantity: 0,
      liquidated_quantity: 0,
      critical_volume: 0,
      unit: 0,
      status: '',
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
    /*
      TODO: form validation
    */
  },

  watch: {
    showDialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },

  async mounted() {
    const response = await axios.get(`${url}/warehouse/`);
    this.componentData = response.data;
    this.componentData = [];
    const obj1 = {
      serial_id: '25',
      product_title: 'product1',
      product_type: 'type1',
      product_code: 'code1',
      dosage: 'twice a day',
      received_date: '2021-01-21',
      expiration_date: '2222-02-22',
      stock_quantity: 525600,
      critical_volume: 500,
      unit: 'gigabits per horsepower',
      packaging: 'icebox',
      batch_number: 1,
      batch_status: 'active',
      product_status: 'active',
      pulled_out_quantity: 0,
      liquidated_quantity: 0,
    };
    this.componentData.push(obj1);
    console.log(this.componentData);
  },

  methods: {
    /*
      Copies the data to editedItem to display on dialog.
      showDialog triggers the dialog view of the form.
    */
    editItem(item) {
      console.log('Editing item!');
      console.log(item);
      // get index of item
      this.editedIndex = this.componentData.indexOf(item);
      // assign item to editedItem obj
      this.editedItem = { ...item };
      // format string to date
      let tempDate = new Date(this.editedItem.expiration_date).toISOString().substr(0, 10);
      this.editedItem.expiration_date = tempDate;
      tempDate = new Date(this.editedItem.received_date).toISOString().substr(0, 10);
      this.editedItem.received_date = tempDate;
      // set true to show dialog view
      this.showEditDialog = true;
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
      For item liquidation
    */
    liquidateItem(item) {
      console.log('Liquidating!');
      console.log(item);
      this.showLiquidateDialog = true;
    },
    /*
      For pulling out item into operations
      creates Operations item
    */
    pullItemOut(item) {
      console.log('Pulling out!');
      console.log(item);
      this.showPullOutDialog = true;
    },
    /*
      For adding a new batch to warehouse
    */
    addNewBatch(item) {
      console.log('Adding new batch!');
      console.log(item);
      this.showAddBatchDialog = true;
    },
    /*
      Pushers the object to the source data
      or update the existing object with new data.
    */
    async save() {
      if (this.editedIndex > -1) {
        const param = this.componentData[this.editedIndex].id;
        const response = await axios.put(`${url}/warehouse/${param}`, this.editedItem);
        Object.assign(this.componentData[this.editedIndex], response.data);
      } else {
        console.log('hi');
        /*
        * eslint-disable-next-line prefer-template
        * this.editedItem.item_id = '0' + (this.componentData[0].data.length + 1).toString();
        * this.componentData[0].data.push(this.editedItem);
        */
      }
      this.close();
    },
  },
};
</script>
