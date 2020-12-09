<template>
  <div id="login">
    <div class="loginWidget">
        <v-form>
            <h3>Sign In</h3>
            <v-text-field class="tField white" v-model="username" color="white"
            outlined="true" placeholder="Username"></v-text-field>
            <v-text-field class="tField white" v-model="password" color="white"
            outlined="true" placeholder="Password"></v-text-field>
            <v-btn color="primary">Log In</v-btn>
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
    };
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
    padding: 10%;
}

.loginWidget{
    background-color: #D7EEF3;
    margin-left: 30%;
    margin-right: 30%;
    padding: 5%;
}

</style>
