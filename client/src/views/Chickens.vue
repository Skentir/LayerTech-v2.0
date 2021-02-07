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
                <v-btn id="create-btn"
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
                  label="Supplier Name" :disabled="editedIndex > -1" required/>
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
                  label="Population" :disabled="editedIndex > -1" type="number" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.mortality_rate"
                  :rules="rules.mortality_rate"
                  label="Mortality Rate" type="number" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.morbidity_rate"
                  :rules="rules.morbidity_rate"
                  label="Morbidity Rate" type="number" required/>
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
                  ref="menu_date_received"
                  v-model="menu_date_received"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date_received"
                      :disabled="editedIndex > -1"
                      :rules="rules.date_received"
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
                    v-model="editedItem.date_received"
                    no-title
                    @input="menu_date_received = false"
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
          <v-btn id="close-create-btn"
            color="blue darken-1"
            text
            @click="showDialog=false"
          >
            Close
          </v-btn>
          <v-btn id="submit-create-btn"
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
            <v-dialog v-model="dialogPullAdd" max-width="500px">
              <v-form ref="addPull">
                <v-card>
                  <v-card-title class="headline">
                    Add/Call-out chickens
                  </v-card-title>
                  <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <!--
                        <v-select
                        v-model="addCall"
                        :items="add_call_items"
                        label="Please choose an action" item-value="name" item-text="name" required>
                          <template v-slot:selection="data">
                          {{ data.item.name }}
                          </template>
                          <template v-slot:item="data">
                            <v-list-tile-content>
                              <v-list-tile-title @click="filterAddCall(data.item.name)"
                              v-html="data.item.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </v-select>
                        -->
                        <select v-model="addCall" class="select-css">
                          <option value="1"
                          :selected="addCall === 1">
                          Add Chickens</option>
                          <option value="2"
                          :selected="addCall === 2">
                          Call-out Chickens</option>
                        </select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="addCallItem.population"
                          :rules="rules.add_population"
                          :disabled="addCall==2"
                          label="Add Population" type="number" required/>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="addCallItem.called_out_quantity"
                          :rules="rule_call_out"
                          :disabled="addCall==1"
                          label="Call out chickens" type="number"
                          required/>
                      </v-col>
                    </v-row>
                  </v-container>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    id="close-call-btn"
                    color="blue darken-1"
                    text
                    @click="closePullAdd">Cancel</v-btn>
                    <v-btn
                    id="submit-call-btn"
                    color="blue darken-1"
                    text
                    @click="pullAddConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-form>
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
            @click="pullAdd(item)"
          >
            mdi-plus-minus-variant
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
    dialogPullAdd: false,
    componentData: [],
    supplier_names: [],
    headers: [
      { text: 'Batch Number', value: 'batch_number' },
      { text: 'Breed', value: 'breed' },
      { text: 'Chicken Type', value: 'chicken_type' },
      { text: 'Population', value: 'population' },
      { text: 'Called Out Quantity', value: 'called_out_quantity' },
      { text: 'Mortality Rate', value: 'mortality_rate' },
      { text: 'Morbidity Rate', value: 'morbidity_rate' },
      { text: 'Feed Requirement', value: 'feed_requirement' },
      { text: 'Vaccination Schedule', value: 'vaccination_schedule' },
      { text: 'Date Received', value: 'date_received' },
      { text: 'Supplier Name', value: 'supplier_name' },
      { text: 'Person In Charge', value: 'person_in_charge' },
      { text: 'Section', value: 'section' },
      { text: 'Building', value: 'building' },
      { text: 'Actions', value: 'actions' },
    ],
    editedIndex: -1,
    editedItem: {
      /*
        Below are temporary data that will be filled in
        for the edit form
      */
      batch_number: 0,
      supplier_name: '',
      breed: '',
      chicken_type: '',
      population: 0,
      called_out_quantity: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_received: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section: '',
      building: '',
    },
    /*
      Below are temporary data that will be filled in
      for the for the add and call out chickens
    */
    addCallItem: {
      population: 0,
      called_out_quantity: 0,
    },
    defaultItem: {
      /*
        Below are temporary data that will be filled in
        for the create form
      */
      batch_number: 0,
      supplier_name: '',
      breed: '',
      chicken_type: '',
      population: 0,
      called_out_quantity: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_received: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section: '',
      building: '',
    },
    date: new Date().toISOString().substr(0, 10),
    menu_date_recieved: false,
    chicken_types: ['Adult', 'Pullet'],
    add_call_items: ['Add Population', 'Call Out Chickens'],
    rules: {
      /* eslint arrow-parens: 0 */
      supplier_name: [val => !!val || 'This field is required'],
      breed: [val => !!val || 'This field is required'],
      chicken_type: [val => !!val || 'This field is required'],
      population: [
        val => !!val || 'This field is required',
        val => /^[1-9][0-9]*$/.test(val) || 'Integer must be valid and more than 0',
      ],
      add_population: [
        val => /^[0-9][0-9]*$/.test(val) || 'Integer must be valid',
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
    addCall: 1,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    rule_call_out() {
      return [
        val => /^[0-9][0-9]*$/.test(val) || 'Integer must be valid',
        val => val <= this.editedItem.population || 'Call out chickens number should be less than or equal to population'// population is updated on click (HOW TO FIX??????)
      ];
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
    filterAddCall(itemName) {
      console.log(itemName);
    },
    */
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
      Opens the pull out chicken/add to population modal
    */
    pullAdd(item) {
      this.editedIndex = this.componentData.indexOf(item);
      this.editedItem = { ...item };
      this.addCallItem.population = 0;
      this.addCallItem.called_out_quantity = 0;
      this.addCall = 1;
      /*
      update the population here: invalidation for call out chickens
      */
      this.dialogPullAdd = true;
    },
    /*
      Confirms the add population and/or pull off a chicken batch and updates the table.
    */
    async pullAddConfirm() {
      if (this.$refs.addPull.validate()) {
        const param = this.componentData[this.editedIndex]._id;
        /* eslint no-underscore-dangle: 0 */
        /* eslint prefer-template: 0 */
        /*
          Arithmetic operations here for the population and called out quantity
        */
        console.log('addCallItem.population: ' + this.addCallItem.population);
        console.log('editedItem.population: ' + this.editedItem.population);
        let tempPop = Number(this.editedItem.population);
        let tempCall = Number(this.editedItem.called_out_quantity);
        tempPop += Number(this.addCallItem.population);
        tempCall += Number(this.addCallItem.called_out_quantity);
        tempPop -= Number(this.addCallItem.called_out_quantity);
        const obj = {
          population: tempPop,
          called_out_quantity: tempCall,
        };
        const response = await axios.put(`${url}/chickens/${param}`, obj);
        Object.assign(this.componentData[this.editedIndex], response.data);
        this.closePullAdd();
      }
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
      Closes the pull and add chickens dialog and resets editedItem
      to defaultItem. Also resets editedIndex to -1.
    */
    closePullAdd() {
      this.dialogPullAdd = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
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
          // update the batch number here
          const chickens = await axios.get(`${url}/chickens/`);
          this.editedItem.batch_number = chickens.data.length + 1;
          const response = await axios.post(`${url}/chickens/`, this.editedItem);
          this.componentData.push(response.data);
        }
        this.close();
      }
    },
  },
};
</script>
<style>
  /* class applies to select element itself, not a wrapper element */
  .select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: .65em auto, 100%;
  }
  /* Hide arrow icon in IE browsers */
  .select-css::-ms-expand {
    display: none;
  }
  /* Hover style */
  .select-css:hover {
    border-color: #888;
  }
  /* Focus style */
  .select-css:focus {
    border-color: #aaa;
    /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  /* Set options to normal weight */
  .select-css option {
    font-weight:normal;
  }
  /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
    background-position: left .7em top 50%, 0 0;
    padding: .6em .8em .5em 1.4em;
  }
</style>
