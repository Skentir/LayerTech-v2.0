<template>
    <v-row id="nav">
        <v-col cols="6">
            <div class="left-container">
                <v-img src='@/assets/Navbar-Logo.png' id="logo">
                </v-img>
            </div>
            <div class="left-container" id="home">
                <router-link to="/home">Home</router-link>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="right-container">
                <v-btn to ="/" id="logout">
                    Log Out
                </v-btn>
            </div>
            <div class="right-container" id="user">
                FirstName LastName
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
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
    float: left;
}
.right-container {
    float: right;
}
#logo {
    height: 30px;
    width: 30px;
    margin-left: 15px;
}
#home {
    margin-left: 10px;
    margin-top: 6px;
}
#home a{
    font-weight: bold;
    text-decoration: none;
    color: white;
}

#user {
    margin-top: 7px;
    margin-right: 10px;
    font-weight: bold;
}
#logout {
    border-radius: 3px;
    background: #CCF6FF;
    font-weight: 900;
    margin-right: 15px;
    margin-top: -2px;
}
</style>
