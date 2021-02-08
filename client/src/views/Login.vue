<template>
  <div id="login" fill-height>
    <div class="loginWidget">
      <v-form @submit.prevent="login(username, password)">
        <img id="company-logo" src="../assets/undraw_nature_m5ll 1.png" />
        <h1 id="company-name">LayerTech</h1>
        <br />
        <h3 class="splash-text">
          An inventory and stock management web application for your farm
        </h3>
        <br />
        <!-- Error message container -->
        <v-alert
          id="error-msg"
          dense
          v-show="hasError"
          type="error"
        >
          {{errorMsg}}
        </v-alert>
        <v-text-field
          id="username_tfield"
          :rules="rules.required"
          class="tField"
          v-model="username"
          background-color="rgba(255,255,255,1)"
          outlined
          placeholder="Username"
        ></v-text-field>
        <v-text-field
          id="password_tfield"
          :rules="rules.required"
          class="tField"
          :type="'password'"
          v-model="password"
          background-color="rgba(255,255,255,1)"
          outlined
          placeholder="Password"
        ></v-text-field>
        <v-btn
          :disabled="!formIsValid"
          type="submit"
          id="login-btn"
          color="rgba(4,35,178,1)"
          class="lButton"
          elevation="2"
        >
          Log In
        </v-btn>
        <br />
        <br />
      </v-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import employeesData from '@/models/employees.json';
import LoginService from '../../services/LoginService';

const url = process.env.VUE_APP_API_URL;

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: null,
      password: null,
      hasError: false, // for whether status message will show or not
      authenticated: false,
      accounts: employeesData,
      account: null, // hardcoded admin account
      errorMsg: 'The username or password you entered did not match our records. Please double-check and try again.',
      rules: {
        /* eslint arrow-parens: 0 */
        required: [val => (val || '').length > 0 || 'This field is required'],
      },
      showErrorMsg: false
    };
  },
  methods: {
    async login(username, password) {
      const credentials = { username, password };
      LoginService.login(credentials)
        .then(() => {
          console.log('login done.');
          this.$router.push('/home');
        })
        .catch((err) => {
          console.log(`login failed with ERROR: ${err}`);
          this.hasError = true;
        });
    },
  },
  computed: {
    formIsValid() {
      return ( // fields must be filled
        this.username
        && this.password
      );
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem('auth-token'))) { // if logged in
      this.$router.push('/home');
    }
    console.log(url); // localhost8080 if dev
  }
};
</script>

<style>
#login {
  background-color: #36409b;
  height: 100vh;
  width: 100%;
  display: block;
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
}

#login-btn {
  color: #ffffff;
}

.loginWidget {
  text-align: center;
  background-color: #d7eef3;
  margin-top: 8%;
  margin-left: 30%;
  margin-right: 30%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 2%;
  border-radius: 6px;
}

img#company-logo {
  max-width: 100%;
  max-height: 100%;
}

h3.splash-text {
  font-weight: normal;
}

h3#error-msg {
  color: red;
  font-weight: normal;
}
</style>
