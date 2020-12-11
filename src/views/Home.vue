<template>
  <div class="home">
    <v-row>
      <div class="image-banner">
        <v-row no-gutters>
          <v-col cols="6" class="farm-title" tag="span">
            <span id="farm-title">Farm Title Here</span>
          </v-col>
          <v-col cols="4" class="location-title" tag="span">
            <span id="location-title">Location Here</span>
          </v-col>
        </v-row>
      </div>
      <div class="content">
        <div class="alerts">

        </div>
        <div class="quick-nav">
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>

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
    height: 40%;
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
    text-align: left;
  }

  .location-title {
    font-weight: normal;
    color: rgb(255, 255, 255);
    font-size: 16px;
    position: absolute;
    bottom:3px;
    right:3px;
    text-align: right;
  }
</style>
