<template>
  <div class="chickens">
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
                v-model="editedItem.chickenType"
                label="Chicken Type" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="editedItem.population"
                label="Population" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="editedItem.morbidityRate"
                label="Mortality Rate" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="editedItem.morbidityRate"
                label="Morbidity Rate" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.feedRequirement"
                label="Feed Requirement" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.vaccinationSchedule"
                label="Vaccination Schedule" required/>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.dateRecieved"
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
                  v-model="editedItem.dateRecieved"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.personInCharge"
                label="Person in-Charge" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.sectionAssigned"
                label="Section Assigned" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.buildingAssigned"
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
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import ChickensData from '@/models/chickens.json';

export default {
  components: {
    PageTemplate,
  },
  data: (vm) => ({
    pageInfo: {
      title: 'Chickens',
      description: ' This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page This is the Chickens page ',
    },
    search: '',
    tableTitle: 'Chickens',
    showDialog: false,
    dialogDelete: false,
    componentData: [],
    editedIndex: -1,
    editedItem: {
      breed: '',
      chickenType: '',
      population: 0,
      mortalityRate: 0,
      morbidityRate: 0,
      feedRequirement: '',
      vaccinationSchedule: '',
      dateRecieved: new Date().toISOString().substr(0, 10),
      personInCharge: '',
      sectionAssigned: '',
      buildingAssigned: '',
    },
    defaultItem: {
      breed: '',
      chickenType: '',
      population: 0,
      mortalityRate: 0,
      morbidityRate: 0,
      feedRequirement: '',
      vaccinationSchedule: '',
      dateRecieved: new Date().toISOString().substr(0, 10),
      personInCharge: '',
      sectionAssigned: '',
      buildingAssigned: '',
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
      this.componentData = ChickensData;
    },
    editItem(item) {
      this.editedIndex = this.componentData[0].data.indexOf(item);
      this.editedItem = { ...item };
      this.editedItem.dateRecieved = new
      Date(this.editedItem.dateRecieved).toISOString().substr(0, 10);
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
