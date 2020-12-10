<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-col class="text-right pr-0">
        <v-btn v-bind="attrs" v-on="on">Add Supplier</v-btn>
      </v-col>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a new Supplier</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Supplier Name" required/>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Supplier Files Link" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Contact Number" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Email" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Company Name" required/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Position in Company" required/>
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
  name: 'FormSuppliers',
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
