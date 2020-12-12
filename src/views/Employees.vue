<template>
  <div class="employees">
    <PageTemplate :pageInfo="pageInfo"/>
    <v-data-table
      :headers="this.componentData[0].headers"
      :items="this.componentData[0].data"
      :search="search"
      sort-by="username"
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
                Add Employee
              </v-btn>
            </v-col>
          </template>
          <v-card>
            <v-card-title>
              <span id="form_title" class="headline">Add new employee</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="username_text_field"
                      v-model="editedItem.username"
                      label="Username"
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
                    <v-text-field
                      id="first_name_text_field"
                      v-model="editedItem.first_name"
                      label="First Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      id="last_name_text_field"
                      v-model="editedItem.last_name"
                      label="Last Name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="number_text_field"
                      v-model="editedItem.number"
                      label="Contact Number"
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
                    <v-select
                      id="department_text_field"
                      v-model="editedItem.department"
                      :items="['Logistics', 'Operations']"
                      label="Department"
                      required
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      id="role_text_field"
                      v-model="editedItem.role"
                      label="Role"
                      required
                    ></v-text-field>
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
                Are you sure you want to delete this user?
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
          id="edit_item_btn"
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
// @ is an alias to /src
import PageTemplate from '@/components/PageTemplate.vue';
import employeesData from '@/models/employees.json';

export default {
  components: {
    PageTemplate,
  },
  data: () => ({
    pageInfo: {
      title: 'Employees',
      description: 'Track your employees here. This page contains the information of every employee. testing CI',
    },
    search: '',
    tableTitle: 'Employee',
    showDialog: false,
    dialogDelete: false,
    componentData: [],
    editedIndex: -1,
    editedItem: {
      username: '',
      first_name: '',
      last_name: '',
      number: '',
      department: '',
      role: '',
    },
    defaultItem: {
      username: '',
      first_name: '',
      last_name: '',
      number: '',
      department: '',
      role: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee';
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
  },

  created() {
    this.initialize();
  },

  methods: {
    /*
      Assigns fetched data to local reference inside the component
    */
    initialize() {
      this.componentData = employeesData;
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
      // set true to show dialog view
      this.showDialog = true;
    },
    /*
      Deletes an item from the table with regards to the data.
      Open the delete dialog.
    */
    deleteItem(item) {
      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },
    /*
      Confirms the deletion of an item and updates the table.
    */
    deleteItemConfirm() {
      this.componentData[0].data.splice(this.editedIndex, 1);
      this.closeDelete();
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
      Closes the dialog for deleting an item and resets editedItem
      to defaultItem. Also resets editedIndex to -1.
    */
    closeDelete() {
      this.dialogDelete = false;
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
