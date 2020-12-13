<template>
  <div>
    <div id="login">
      <div class="loginWidget">
          <v-form @submit.prevent="handleSubmit">
              <img id="company-logo" src="../assets/undraw_nature_m5ll 1.png">
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
                :type="'password'"
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
    <v-footer id="footer">
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import employeesData from '@/models/employees.json';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      username: null,
      password: null,
      hasError: false, // for whether status message will show or not
      authenticated: false,
      accounts: employeesData,
      account: null, // hardcoded admin account
      errorMsg: 'The username and password you entered did not match our records. Please double-check and try again.',
    };
  },
  methods: {
    handleSubmit() {
      // get hardcoded account
      // eslint-disable-next-line prefer-destructuring
      this.account = this.accounts[0].data[5];

      // if correct credentials
      if (this.username === this.account.username && this.password === this.account.password) {
        this.authenticated = true;
        this.$router.push('/home'); // redirect to /home
      } else { // if  incorrect credentials
        this.hasError = true;
      }
    },
  },
};
</script>

<style>
#login{
    background-color: #36409B;
    height: 100%;
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
  font-weight: normal;
}
</style>
