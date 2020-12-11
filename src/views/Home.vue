<template>
  <div class="home">
<<<<<<< HEAD
    <img alt="Vue logo" src="../assets/logo.png">
<<<<<<< HEAD
    <b-alert show>Default Alert</b-alert> <!-- this is a bootstrap vue component -->
    <Table/>
=======
    <HelloWorld msg="Welcome to Your Vue.js App"/>
>>>>>>> parent of 8c7e8b3... init
=======
    <v-row>
      <div class="image-banner">
        <v-col cols="6" class="farm-title">
            Farm Title Here
        </v-col>
        <v-col class="location-title">
          Location Here
        </v-col>
      </div>
    </v-row>
>>>>>>> e8eae7b4627af0a51e88d46c1dc2bd5cab44cd26
  </div>
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld.vue';
=======
>>>>>>> e8eae7b4627af0a51e88d46c1dc2bd5cab44cd26

export default {
  name: 'Home',
  components: {
<<<<<<< HEAD
    HelloWorld,
=======

  },
  data() {
    return {

    };
>>>>>>> e8eae7b4627af0a51e88d46c1dc2bd5cab44cd26
  },
};
</script>

<style scoped>
  .image-banner {
    width: 100%;
    height: 55%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../assets/202010504858.png");
    background-size: cover;
    background-position: 60% 45%;
    aspect-ratio: 1-1;
  }

  .farm-title{
    font-weight: bold;
    color: rgb(255, 255, 255);
    font-size: 64px;
    position: absolute;
    bottom:3px;
    left:3px;
  }

  .location-title {
    font-weight: bold;
    color: rgb(255, 255, 255);
    font-size: 16px;
    position: absolute;
    bottom:3px;
    right:3px;
  }
</style>
