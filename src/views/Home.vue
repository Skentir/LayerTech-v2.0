<template>
  <div class="home">
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {

    };
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
