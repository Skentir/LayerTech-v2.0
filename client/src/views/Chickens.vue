<template>
  <div class="chickens">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <v-data-table
        :headers="this.componentData[0].headers"
        :items="this.componentData[0].data"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >                                                   <!-- get the :items from the axios call-->
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
        <v-card-title>
          <span class="headline">Add a new Chicken</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.breed"
                  label="Breed" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.chicken_type"
                  label="Chicken Type" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.population"
                  label="Population" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.mortality_rate"
                  label="Mortality Rate" required/>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.morbidity_rate"
                  label="Morbidity Rate" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.feed_requirement"
                  label="Feed Requirement" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.vaccination_schedule"
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
                  label="Person in-Charge" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.section_assigned"
                  label="Section Assigned" required/>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.building_assigned"
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
import ChickensData from '@/models/chickens.json';
import Navbar from '@/components/layout/Navbar.vue';

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
    editedIndex: -1,
    editedItem: {
      /*
        Below are temporary data that will be filled in
        for the edit form
      */
      breed: '',
      chicken_type: '',
      population: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_recieved: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section_assigned: '',
      building_assigned: '',
    },
    defaultItem: {
      /*
        Below are temporary data that will be filled in
        for the create form
      */
      breed: '',
      chicken_type: '',
      population: 0,
      mortality_rate: 0,
      morbidity_rate: 0,
      feed_requirement: '',
      vaccination_schedule: '',
      date_recieved: new Date().toISOString().substr(0, 10),
      person_in_charge: '',
      section_assigned: '',
      building_assigned: '',
    },
    date: new Date().toISOString().substr(0, 10),
    menu_date_recieved: false,
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
      Loads dummy data into table above
    */
    initialize() {
      this.componentData = ChickensData;
    },
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

      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.editedItem.date_recieved = new
      Date(this.editedItem.date_recieved).toISOString().substr(0, 10);
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
      });
    },
    /*
      Creates a new row based on new input data
      appends newly created row into the existing table
    */
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.componentData[0].data[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line prefer-template
        this.editedItem.batch_num = '0' + (this.componentData[0].data.length + 1).toString();
        this.componentData[0].data.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
