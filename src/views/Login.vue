<template>
  <div id="login">
    <div class="loginWidget">
        <v-form @submit.prevent="handleSubmit">
            <img id="company-logo" src="..\assets\undraw_nature_m5ll 1.png">
            <h1 id="company-name">LayerTech</h1>
            <br>
            <h3 class="splash-text"
            >An inventory and stock management web application for your farm</h3>
            <br>
            <v-text-field
              id="username_tfield"
              class="tField"
              v-model="username"
              background-color="rgba(255,255,255,1)"
              outlined
              placeholder="Username"
            ></v-text-field>
            <v-text-field
              id="password_tfield"
              class="tField"
              v-model="password"
              background-color="rgba(255,255,255,1)"
              outlined
              placeholder="Password"
            ></v-text-field>
            <v-btn
              type="submit"
              id="login-btn"
              color="rgba(4,35,178,1)"
              class="lButton"
              elevation="2"
            > Log In </v-btn>
            <br>
            <br>
            <!-- Error message container -->
            <h3 id="error-msg" v-if="hasError">
              {{errorMsg}}
            </h3>
        </v-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      username: null,
      password: null,
      hasError: false, // for whether status message will show or not
      submitted: false,
      errorMsg: 'The username and password you entered did not match our records. Please double-check and try again.',
    };
  },
  methods: {
    handleSubmit() {
      /*
        Handles empty username and password
      */
      if (this.username === '' || this.username == null || this.password === '' || this.password == null) {
        this.hasError = true;
      }
    },
  },
};
</script>

<style>
#login{
    background-color: #36409B;
    height: 100vh;
    width: 100%;
    display: block;
    text-align: center;
    padding: 5%;
}

#login-btn{
  color: #FFFFFF;
}

.loginWidget{
    text-align: center;
    background-color: #D7EEF3;
    margin-left: 32%;
    margin-right: 32%;
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 2%;
    border-radius: 6px;
}

img#company-logo{
  max-width: 100%;
  max-height: 100%;
}

h3.splash-text{
  font-weight: normal;
}

h3#error-msg{
  color: red;
}
</style>
