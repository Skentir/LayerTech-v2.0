<template>
  <div>
    <div class="pageTemplate">
      <v-row>
        <h1>{{pageInfo.title}}</h1>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p>{{pageInfo.description}}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import modules

export default {
  props: {
    pageInfo: Object,
    tableCols: {
      default: null,
      type: Array,
    },
  },
};
</script>

<style scoped>
    .pageTemplate {
        margin-top: 5vh;
        margin-bottom: 1.5vh;
        color: black;
    }

    .pageTemplate h1 {
        font-weight: 700;
        font-size: 40px;

    }
    .pageTemplate p {
        font-weight: 400;
        font-size: 15px;
        text-align: justify;
        margin-left: -10px;
        margin-top: -5px;
    }
</style>
