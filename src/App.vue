<template>
<div>
  <Navbar />
  <v-app id="app">
    <div class="content-wrap">
      <router-link to="/suppliers">Suppliers</router-link> |
      <router-link to="/employees">Employees</router-link> |
      <router-link to="/operations">Operations</router-link>
      <router-view/>
    </div>
      <v-footer id="footer">
    </v-footer>
  </v-app>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
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
  margin-left: 4vw;
  margin-right: 4vw;
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 5vh;
}

#footer {
  position: absolute;
  background-color: #C4C4C4;
  bottom: 0;
  width: 100vw;
  height: 3.5rem;
  margin-left: -4vw;
  margin-right: -4vw;
}

</style>
