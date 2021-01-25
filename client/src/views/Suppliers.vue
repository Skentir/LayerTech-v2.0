<template>
  <div class="Suppliers">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <v-data-table
        :headers="this.headers"
        :items="this.componentData"
        :search="search"
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
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.supplier_name"
                    :rules="rules.name"
                    label="Supplier Name" required />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.files_link"
                    :rules="rules.link"
                    label="Supplier Files Link" required />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.contact_num"
                    :rules="rules.contact_num"
                    label="Contact Number" required />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.email"
                    :rules="rules.email"
                    label="Email" required />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.company_name"
                    :rules="rules.company_name"
                    label="Company Name" required />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.position"
                    :rules="rules.position"
                    label="Position in Company" required />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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
            :disabled="!formIsValid"
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
    <v-footer id="footer">
    </v-footer>
  </div>
</template>

<script>

import PageTemplate from '@/components/PageTemplate.vue';
import Navbar from '@/components/layout/Navbar.vue';
import axios from 'axios';

// @ is an alias to /src
export default {
  components: {
    PageTemplate,
    Navbar,
  },
  data: () => ({
    pageInfo: {
      title: 'Suppliers',
      description: ' This page stores the information of all the suppliers that the farm works with. ',
    },
    search: '',
    tableTitle: 'Suppliers',
    showDialog: false,
    componentData: [],
    headers: [
      {
        text: 'id', align: 'start', sortable: false, value: 'supplier_id',
      },
      { text: 'Supplier Name', value: 'supplier_name' },
      { text: 'Suppliers Files Link', value: 'files_link', sortable: false },
      { text: 'Contact Number', value: 'contact_num', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Company Name', value: 'company_name' },
      { text: 'Position in Company', value: 'position' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      /*
        Below are temporary data that will be filled in
        for the edit form
      */
      supplier_name: '',
      files_link: '',
      contact_num: '',
      email: '',
      company_name: '',
      position: '',
    },
    /*
      Below are temporary data that will be filled in
      for the create form
    */
    defaultItem: {
      supplier_name: '',
      files_link: '',
      contact_num: '',
      email: '',
      company_name: '',
      position: '',
    },
    validEmail: false,
    rules: {
      /* eslint arrow-parens: 0 */
      name: [val => (val || '').length > 0 || 'This field is required'],
      link: [
        val => (val || '').length > 0 || 'This field is required',
      ],
      contact_num: [val => (val || '').length > 0 || 'This field is required'],
      email: [
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      company_name: [val => (val || '').length > 0 || 'This field is required'],
      position: [val => (val || '').length > 0 || 'This field is required'],
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    /*
      Button for Save will be disabled if at least one field is empty

      To-do:
        1. button is still disabled if one field is showing an error
    */
    formIsValid() {
      return (
        this.editedItem.supplier_name
        && this.editedItem.files_link
        && this.editedItem.contact_num
        && this.validEmail
        && this.editedItem.company_name
        && this.editedItem.position
      );
    },
  },
  watch: {
    showDialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },
  async mounted() {
    /*
      switched created to mounted based on reference

      this just loads the suppliers into componentData
    */
    const response = await axios.get('/api/suppliers/');
    this.componentData = response.data;
  },
  methods: {
    /*
      Fetches data from a row and loads them into
      the edit form modal
    */
    editItem(item) {
      /*
        In Order:
          1. Gets index of the row being edited to editedIndex
          2. loads said item into editedItem object
          3. then displays the dialog/modal
      */
      this.editedIndex = this.componentData.indexOf(item);
      this.editedItem = { ...item };
      this.showDialog = true;
    },
    /*
      Closes the dialog/modal then wipes the data from
      editedItem object ; resets editedIndex back to -1
    */
    close() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
        /*
          I encased the text field in a v-form
          why:
          error messages dont reset after closing the
          dialog box, based on docs can only 'reset'
          if encased in a v-form
        */
        this.$refs.form.reset();
      });
    },
    /*
      Creates a new row based on new input data
      appends newly created row into the existing table
    */
    /*
      I just reused the save function to minimize additional functions
      its now aync to accomodate api calls
    */
    async save() {
      if (this.editedIndex > -1) {
        /*
          this sends the _id to api/suppliers/:id to update
        */
        const param = this.componentData[this.editedIndex]._id;
        /* eslint no-underscore-dangle: 0 */
        /* eslint prefer-template: 0 */
        /*
          I found that sending the entire this.edited item is acceptable

          returns the updated supplier/row
        */
        const response = await axios.put('/api/suppliers/' + param, this.editedItem);
        /*
          Reused the the line under to 'refresh' the table with the updated row
        */
        Object.assign(this.componentData[this.editedIndex], response.data);
      } else {
        /*
          To follow:
          remove this supplier_id and other X_id
        */
        // eslint-disable-next-line prefer-template
        this.editedItem.supplier_id = '0' + (this.componentData.length + 1).toString();
        /*
          ****Throws Error 500 when all fields are not filled in
        */

        const response = await axios.post('/api/suppliers/', this.editedItem);
        /*
          returns newly created suppliers then pushing it in the table
        */
        this.componentData.push(response.data);
      }

      this.close();
    },
  },
};
</script>
