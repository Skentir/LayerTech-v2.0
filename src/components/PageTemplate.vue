<template>
  <div>
    <v-row class="pageTemplate">
        <v-col cols="6" class="left-container">
            <div class="info-container">
                <h1>{{pageInfo.title}}</h1>
                <br>
                <p>{{pageInfo.description}}</p>
            </div>
        </v-col>
    </v-row>
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
    }

    .info-container {
        color: black;
    }
    .info-container h1 {
        font-weight: 700;
        font-size: 40px;
        float: left;
        margin-bottom: 13px;
    }
    .info-container p {
        font-weight: 400;
        font-size: 15px;
        float: left;
        text-align: justify;
    }
</style>
