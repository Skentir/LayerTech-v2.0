<template>
  <div class="operations">
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
                Add item
              </v-btn>
            </v-col>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add item to inventory</span>
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
                      v-model="editedItem.product_type"
                      label="Product Type"
                      hint="e.g. vaccine, feeds, etc."
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.unit"
                      label="Unit"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.exp_date"
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                          required
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.exp_date"
                        no-title
                        @input="menu1 = false"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
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
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
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
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import operationsData from '@/models/operations.json';

export default {
  components: {
    PageTemplate,
  },
  data: (vm) => ({
    pageInfo: {
      title: 'Operations',
      description: ' This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page This is the Operations page ',
    },
    search: '',
    tableTitle: 'Inventory',
    showDialog: false,
    dialogDelete: false,
    componentData: [],
    editedIndex: -1,
    editedItem: {
      item_name: '',
      product_type: 0,
      quantity: 0,
      unit: 0,
      exp_date: new Date().toISOString().substr(0, 10),
      dosage: '',
    },
    defaultItem: {
      item_name: '',
      product_type: 0,
      quantity: 0,
      unit: 0,
      exp_date: new Date().toISOString().substr(0, 10),
      dosage: '',
    },
    date: new Date().toISOString().substr(0, 10),
    // di nagamit pero for reference
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    showDialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
    watch: {
      date() {
        this.dateFormatted = this.formatDate(this.date);
      },
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.componentData = operationsData;
    },
    editItem(item) {
      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.editedItem.exp_date = new Date(this.editedItem.exp_date).toISOString().substr(0, 10);
      this.showDialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.componentData[0].data.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
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
        this.editedItem.item_id = '0' + (this.componentData[0].data.length + 1).toString();
        this.componentData[0].data.push(this.editedItem);
      }
      this.close();
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
};
</script>
