<template>
    <v-row id="nav">
        <v-col cols="6" class="left-container">
            <router-link to="/home">
            <v-img src='@/assets/Navbar-Logo.png' id="logo">
            </v-img>
            </router-link>
            <div id="home">
                <router-link to="/home" class="home-button">Home</router-link>
            </div>
        </v-col>
        <v-col cols="6" class="right-container">
            <div id="user">
                {{fullName}}
            </div>
            <v-btn @click="logout" id="logout">
                Log Out
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
  computed: {
    fullName() {
      return [this.user.first_name, this.user.last_name].join(' ');
    },
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('auth-token');
      localStorage.removeItem('role');
      this.$router.push('/'); // redirect to login page
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.fullName);
  }
};
</script>

<style scoped>
    #nav {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #36409B;
    height: 3.5rem;
    color: white;
    font-size: 18px;
    }
    .left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30px;
    }
    .right-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #logo {
        max-height: 30px;
        max-width: 30px;
    }
    #home{
        margin-left: 20px;
    }
    #home a{
        font-weight: normal;
        text-decoration: none;
        color: white;
    }

    #user {
        margin-right: 10px;
        font-weight: normal;
    }
    #logout {
        border-radius: 3px;
        background: #CCF6FF;
        font-weight: 900;
        margin-right: 15px;
        margin-top: -2px;
    }
</style>
