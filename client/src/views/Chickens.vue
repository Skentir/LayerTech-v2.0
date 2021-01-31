<template>
  <div class="chickens">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <v-data-table
        :headers="this.headers"
        :items="this.componentData"
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
                  Add Chicken
                </v-btn>
              </v-col>
            </template>
        <v-card>
        <v-form ref="form">
        <v-card-title>
          <span class="headline">Add a new Chicken</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12">
                <v-select
                  v-model="editedItem.supplier_name"
                  :rules="rules.supplier_name"
                  :items="supplier_names"
                  label="Supplier Name" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.breed"
                  :rules="rules.breed"
                  label="Breed" required/>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="editedItem.chicken_type"
                  :rules="rules.chicken_type"
                  :items="chicken_types"
                  label="Chicken Type" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.population"
                  :rules="rules.population"
                  label="Population" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.mortality_rate"
                  :rules="rules.mortality_rate"
                  label="Mortality Rate" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.morbidity_rate"
                  :rules="rules.morbidity_rate"
                  label="Morbidity Rate" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.feed_requirement"
                  :rules="rules.feed_requirement"
                  label="Feed Requirement" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.vaccination_schedule"
                  :rules="rules.vaccination_schedule"
                  label="Vaccination Schedule" required/>
              </v-col>
              <v-col cols="6">
                <v-menu
                  ref="menu_date_recieved"
                  v-model="menu_date_recieved"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date_recieved"
                      :rules="rules.date_recieved"
                      label="Date"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.date_recieved"
                    no-title
                    @input="menu_date_recieved = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.person_in_charge"
                  :rules="rules.person_in_charge"
                  label="Person in-Charge" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.section"
                  :rules="rules.section"
                  label="Section Assigned" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.building"
                  :rules="rules.building"
                  label="Building Assigned" required/>
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
            @click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
        </v-form>
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

const url = process.env.VUE_APP_API_URL;

export default {
  components: {
    PageTemplate,
    Navbar,
  },
  data: () => ({
    pageInfo: {
      title: 'Chickens',
      description: ' This page is for tracking the information of chickens by batches. ',
    },
    search: '',
    tableTitle: 'Chickens',
    showDialog: false,
    componentData: [],
    supplier_names: [],
    headers: [
      { text: 'Breed', value: 'breed' },
      { text: 'Chicken Type', value: 'chicken_type', sortable: false },
      { text: 'Population', value: 'population', sortable: false },
      { text: 'Mortality Rate', value: 'mortality_rate', sortable: false },
      { text: 'Morbidity Rate', value: 'morbidity_rate' },
      { text: 'Feed Requirement', value: 'feed_requirement' },
      { text: 'Vaccination Schedule', value: 'vaccination_schedule', sortable: false },
      { text: 'Date Received', value: 'date_received', sortable: false },
      { text: 'Supplier Name', value: 'supplier_name' },
      { text: 'Person In Charge', value: 'person_in_charge' },
      { text: 'Section', value: 'section' },
      { text: 'Building', value: 'building', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      /*
        Below are temporary data that will be filled in
        for the edit form
      */
      supplier_name: '',
      breed: '',
      chicken_type: '',
      population: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_recieved: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section: '',
      building: '',
    },
    defaultItem: {
      /*
        Below are temporary data that will be filled in
        for the create form
      */
      supplier_name: '',
      breed: '',
      chicken_type: '',
      population: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_recieved: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section: '',
      building: '',
    },
    rules: {
      /* eslint arrow-parens: 0 */
      supplier_name: [val => !!val || 'This field is required'],
      breed: [val => !!val || 'This field is required'],
      chicken_type: [val => !!val || 'This field is required'],
      population: [
        val => !!val || 'This field is required',
        val => /^[1-9][0-9]*$/.test(val) || 'Integer must be valid.',
      ],
      mortality_rate: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
      morbidity_rate: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
      feed_requirement: [val => !!val || 'This field is required'],
      vaccination_schedule: [val => !!val || 'This field is required'],
      date_received: [val => !!val || 'This field is required'],
      person_in_charge: [val => !!val || 'This field is required'],
      section: [val => !!val || 'This field is required'],
      building: [val => !!val || 'This field is required'],
    },
    date: new Date().toISOString().substr(0, 10),
    menu_date_recieved: false,
    chicken_types: ['Adult', 'Pullet'],
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
  /*
    switched created to mounted based on reference
    this just loads the chickens into componentData
  */
  async mounted() {
    const response = await axios.get(`${url}/chickens/`);
    this.componentData = response.data;
    // Gets the supplier names from the backend
    const suppliers = await axios.get(`${url}/suppliers/`);
    suppliers.data.forEach(supplier => this.supplier_names.push(supplier.supplier_name));
    console.log(this.supplier_names);
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
          3. Also has to edit the date for editedItem
          4. then displays the dialog/modal
      */

      this.editedIndex = this.componentData.indexOf(item);
      this.editedItem = { ...item };
      this.editedItem.date_received = new Date(this.editedItem.date_received)
        .toISOString().substr(0, 10);
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
        this.$refs.form.reset();
      });
    },
    /*
      Creates a new row based on new input data
      appends newly created row into the existing table
    */
    async submit() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          /*
            this sends the _id to api/chickens/:id to update
          */
          const param = this.componentData[this.editedIndex]._id;
          /* eslint no-underscore-dangle: 0 */
          /* eslint prefer-template: 0 */

          const response = await axios.put(`${url}/chickens/${param}`, this.editedItem);
          Object.assign(this.componentData[this.editedIndex], response.data);
        } else {
          // eslint-disable-next-line prefer-template

          const response = await axios.post(`${url}/chickens/`, this.editedItem);
          this.componentData.push(response.data);
        }
        this.close();
      }
    },
  },
};
</script>
