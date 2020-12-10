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
            <v-col cols="12">
              <v-text-field label="Date Recieved" required/>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Chicken Type" required/>
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
  name: 'FormOperations',
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
