<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-col class="text-right pr-0">
        <v-btn v-bind="attrs" v-on="on">Add Chicken</v-btn>
      </v-col>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a new Chicken</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Batch Number" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Breed" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Chicken Type" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Population" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Mortality Rate" required/>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Morbidity Rate" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Feed Requirement" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Vaccination Schedule" required/>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date Recieved"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Person in-Charge" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Section Assigned" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Building Assigned" required/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
// taken from veutifyjs
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
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
