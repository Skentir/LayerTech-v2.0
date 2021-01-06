<template>
<div>
  <v-app id="app">
    <div class="content-wrap">
      <router-view/>
    </div>
  </v-app>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content-wrap {
  padding: 0%;
}

#footer {
  position: absolute;
  background-color: #C4C4C4;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
}

.page-container{
    margin-left: 4vw;
    margin-right: 4vw;
    position: relative;
    min-height: 100vh;
    margin-bottom: 2vw;
  }

</style>
