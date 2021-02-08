<template>
  <div class="home">
    <Navbar/>
    <div class="header"> <!-- Header section -->
      <div class="image-banner">
        <v-row no-gutters class="image-banner-text">
          <v-col cols="8" class="farm-title">
            <span id="farm-title">{{farmName}}</span>
          </v-col>
          <v-col cols="4" class="location-title">
            <span id="location-title">{{farmAddress}}</span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="content">
        <div class="alerts"> <!-- Alerts section -->
          <p class="heading">Alerts</p>
          <v-row>
            <v-col cols="12" id="warehouse-alerts" class="alerts-group"> <!-- Warehouse alerts -->
              <span class="label">Warehouse</span>
              <div class="alerts-box"
              v-if="warehouseAlerts.length > 0"
              >
                <div
                v-for="alert in warehouseAlerts"
                :key="alert.alert_id"
                class="alert"
                v-bind:class="{'alert-yellow':(alert.type === 2),
                'alert-red':(alert.type === 1 || alert.type === 3)}"
                >
                    <span class="icon-notif"></span>
                    <span
                    v-if="alert.type === 1"
                    >Batch {{alert.batch_number}} of {{alert.item_name}} is almost out of stock
                    </span>
                    <span
                    v-else-if="alert.type === 2"
                    >Batch {{alert.batch_number}} of {{alert.item_name}} expires in less than a week
                    </span>
                    <span
                    v-else-if="alert.type === 3"
                    >Batch {{alert.batch_number}} of {{alert.item_name}} expires today
                    </span>
                </div>
              </div>
              <div class="alerts-box"
              v-else>
                <div class="alert">
                <span>No new notifications to show.</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="quick-nav">
          <p class="heading">Quick Navigation</p>
          <div class="nav-icons"> <!-- Navigation Buttons -->
            <a href="#/suppliers">
              <div id="nav-suppliers" class="nav-button">
                <span class="nav-label">Suppliers</span>
              </div>
            </a>
            <a href="#/warehouse">
              <div id="nav-warehouse" class="nav-button">
                <span class="nav-label">Warehouse</span>
              </div>
            </a>
            <a href="#/operations">
              <div id="nav-operations" class="nav-button">
                <span class="nav-label">Operations</span>
              </div>
            </a>
            <a href="#/chickens">
              <div id="nav-chickens" class="nav-button">
                <span class="nav-label">Chickens</span>
              </div>
            </a>
            <a href="#/employees" v-if="isAdmin">
              <div id="nav-employees" class="nav-button">
                <span class="nav-label">Manage Employees</span>
              </div>
            </a>

            <!-- fillers to keep the buttons aligned -->
            <a href="#/home" v-if="!isAdmin" class="inactiveLink">
              <div class="nav-button">
                <span class="nav-label"></span>
              </div>
            </a>

            <a href="#/home" class="inactiveLink">
              <div class="nav-button">
                <span class="nav-label"></span>
              </div>
            </a>
          </div>
        </div>
    </div>
    <v-footer id="footer">
    </v-footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const url = process.env.VUE_APP_API_URL;

export default {
  name: 'Home',
  components: {
    Navbar,
  },
  computed: {
    // updates user role
    role() {
      return this.user.role;
    },
    // role identifiers used for conditional rendering
    isAdmin() {
      return this.role === 'Admin';
    },
    isLogistics() {
      return this.role === 'Admin' || this.role === 'Logistics';
    },
  },
  data() {
    return {
      farmName: 'Mugnolia Poultry Farm',
      farmAddress: 'Lecheria Rd, Calamba, 4027 Laguna',
      accountingAlerts: [],
      warehouseAlerts: [],
      // operationsAlerts: [],
      user: null,
    };
  },
  async created() {
    // this.initialize();
    // store role of the current user
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.role);
    console.log(this.isAdmin);
    const response = await axios.get(`${url}/warehouse/alerts`);
    this.warehouseAlerts = response.data;
    console.log(this.warehouseAlerts);
  },
};
</script>

<style>
  .image-banner {
    width: 100%;
    height: 100%;
    background: url("../assets/images/default_farm_cover.jpg");
    background-size: cover;
    background-position: 60% 45%;
    aspect-ratio: 1-1;
  }

  .image-banner-text{
    position: relative;
    top: 42vh;
  }

  .farm-title{
    font-weight: bold;
    color: rgb(255, 255, 255);
    font-size: 64px;
    position: absolute;
    bottom:10px;
    left:10px;
    text-align: left;
  }

  .location-title {
    font-weight: normal;
    color: rgb(255, 255, 255);
    font-size: 20px;
    position: absolute;
    bottom:28px;
    right:10px;
    text-align: right;
  }

  .header{
    width: 100%;
    height: 40vh;
  }

  .content{
    color: black;
    text-align: left;
    padding: 3%;
    margin-left: 4vw;
    margin-right: 4vw;
    position: relative;
    min-height: 100vh;
    padding-bottom: 5%;
  }

  .content > div > p.heading{
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 0px;
  }

  .alerts {
    width: 35%;
  }

  .alerts > div > span.label{
    position: relative;
    top: 13px;
    left: 20px;
    background-color: white;
  }

  .alerts > div > div > span.label{ /* for Accounting/Warehouse grouping */
    position: relative;
    top: 13px;
    left: 20px;
    background-color: white;
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .alerts > div > div.alerts-box{
    border-style: solid;
    border-radius: 5px;
    border-width: 2px;
    padding: 15px;
    margin-bottom: 25px;
  }

  .alerts > div > div > div.alerts-box{ /* for Accounting/Warehouse grouping */
    border-style: solid;
    border-radius: 5px;
    border-width: 2px;
    padding: 15px;
    margin-bottom: 25px;
  }

  .alerts > div > div.alerts-group{
    width: 30%;
  }

  .alerts-group{
    height: 100%;
  }

  .alerts-box{
    max-height: 25%;
  }

  .alerts-box > .alert{ /* styles for alerts */
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
  }

  .alerts-box > .alert > span{
    font-size: 20px;
  }

  .alerts-box > .alert.alert-red{ /* color for red alerts */
    background-color: #F65757;
  }

  .alerts-box > .alert.alert-yellow{ /* color for yellow alerts */
    background-color: #FCF5B7;
  }

  .icon-notif{
    width: 24px;
    height: 24px;
    background: url("../assets/Icon-Notifications.png");
    position: relative;
    top: 4px;
    background-size: cover;
    display: inline-block;
  }

  .nav-icons{ /* Quick Navigation styles */
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-grow: 1;
  }

  .nav-icons > a{
    margin: 2%;
    width: 29%;
    height: 30vh;
  }

  .nav-button{
    background: transparent;
    background-position: center center;
    background-size: cover;
    border-radius: 6px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  #nav-chickens {
    background: linear-gradient(rgb(255,0,0,0), rgb(4,26,125,1)),
    url("../assets/images/Home-Chickens Card.jpg");
    background-position: center center;
    background-size: cover;
  }

  #nav-suppliers {
    background: linear-gradient(rgb(255,0,0,0), rgb(4,26,125,1)),
    url("../assets/images/Home-Suppliers Card.jpg");
    background-position: center center;
    background-size: cover;
  }

  #nav-warehouse {
    background: linear-gradient(rgb(255,0,0,0), rgb(4,26,125,1)),
    url("../assets/images/Home-Warehouse Card.jpg");
    background-position: center center;
    background-size: cover;
  }

  #nav-employees {
    background: linear-gradient(rgb(255,0,0,0), rgb(4,26,125,1)),
    url("../assets/images/Home-Manage Employees Card.jpg");
    background-position: center center;
    background-size: cover;
  }

  #nav-operations {
    background: linear-gradient(rgb(255,0,0,0), rgb(4,26,125,1)),
    url("../assets/images/Home-Operations Card.jpg");
    background-position: center center;
    background-size: cover;
  }

  .nav-label{
    color: #ffffff;
    font-size: 36px;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .inactiveLink {
    pointer-events: none;
    cursor: default;
  }
</style>
