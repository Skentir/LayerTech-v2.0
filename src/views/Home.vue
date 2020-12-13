<template>
  <div class="home">
    <div class="header"> <!-- Header section -->
      <div class="image-banner">
        <v-row no-gutters class="image-banner-text">
          <v-col cols="8" class="farm-title">
            <span id="farm-title">Guyun Stone Forest</span>
          </v-col>
          <v-col cols="4" class="location-title">
            <span id="location-title">Sea of Clouds, Liyue</span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="content">
        <div class="alerts"> <!-- Alerts section -->
          <p class="heading">Alerts</p>
          <v-row id="accounting-warehouse-group">
            <v-col cols="6" id="accounting-alerts" class="alerts-group"> <!-- Accounting alerts -->
              <span class="label">Accounting</span>
              <div class="alerts-box"
              v-if="accountingAlerts.length > 0"
              >
                <div
                v-for="alert in accountingAlerts"
                :key="alert.alert_id"
                class="alert"
                v-bind:class="{'alert-yellow':(alert.value_left > 1),
                'alert-red':(alert.value_left <= 1)}"
                >
                    <span class="icon-notif"></span>
                    <span
                    v-if="alert.value_left >= 0"
                    >{{alert.item_name}} is due in {{alert.value_left}} days.
                    </span>
                    <span
                    v-else-if="alert.value_left < 0"
                    >{{alert.item_name}} is overdue by {{alert.value_left * -1}} days.
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
            <v-col cols="6" id="warehouse-alerts" class="alerts-group"> <!-- Warehouse alerts-->
              <span class="label">Warehouse</span>
              <div class="alerts-box"
              v-if="warehouseAlerts.length > 0"
              >
                <div
                v-for="alert in warehouseAlerts"
                :key="alert.alert_id"
                class="alert"
                v-bind:class="{'alert-yellow':(alert.value_left > 1),
                'alert-red':(alert.value_left <= 1 || alert.type === 'critical')}"
                >
                    <span class="icon-notif"></span>
                    <span
                    v-if="alert.type === 'expiration' && alert.value_left >= 0"
                    >Batch {{alert.batch_no}} of {{alert.item_name}}
                     expires in {{alert.value_left}} days.
                    </span>
                    <span
                    v-else-if="alert.type === 'expiration' && alert.value_left < 0"
                    >Batch {{alert.batch_no}} of {{alert.item_name}}
                     has expired {{alert.value_left * -1}} days ago.
                    </span>
                    <span
                    v-else-if="alert.type === 'critical'"
                    >Batch {{alert.batch_no}} of {{alert.item_name}} is almost out of stock.
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
          <v-row>
            <v-col cols="12" id="operations-alerts" class="alerts-group"> <!-- Operations alerts -->
              <span class="label">Operations</span>
              <div class="alerts-box"
              v-if="operationsAlerts.length > 0"
              >
                <div
                v-for="alert in operationsAlerts"
                :key="alert.alert_id"
                class="alert"
                v-bind:class="{'alert-yellow':(alert.value_left > 1),
                'alert-red':(alert.value_left <= 1)}"
                >
                    <span class="icon-notif"></span>
                    <span
                    v-if="alert.type === 'expiration' && alert.value_left >= 0"
                    >Batch {{alert.batch_no}} of {{alert.item_name}}
                     expires in {{alert.value_left}} days.
                    </span>
                    <span
                    v-else-if="alert.type === 'expiration' && alert.value_left < 0"
                    >Batch {{alert.batch_no}} of {{alert.item_name}}
                     has expired {{alert.value_left * -1}} days ago.
                    </span>
                    <span
                    v-else-if="alert.type === 'critical'"
                    >Batch {{alert.batch_no}} of {{alert.item_name}} is almost out of stock.
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
            <a href="#/employees">
              <div id="nav-employees" class="nav-button">
                <span class="nav-label">Manage Employees</span>
              </div>
            </a>
            <a href="">
              <div class="nav-button">
                <span class="nav-label"></span>
              </div>
            </a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import alertsData from '@/models/alerts.json';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      accountingAlerts: [],
      warehouseAlerts: [],
      operationsAlerts: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    /*
      Assigns fetched data to local reference inside the component
    */
    initialize() {
      // this.accountingAlerts = alertsData[0].accounting;
      this.warehouseAlerts = alertsData[0].warehouse;
      this.operationsAlerts = alertsData[0].operations;
      this.accountingAlerts.sort((a, b) => a.value_left - b.value_left);
      this.warehouseAlerts.sort((a, b) => a.value_left - b.value_left);
      this.operationsAlerts.sort((a, b) => a.value_left - b.value_left);
    },
  },
};
</script>

<style>
  .image-banner {
    width: 100%;
    height: 100%;
    background: url("../assets/202010504858.png");
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
  }

  .content > div > p.heading{
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 0px;
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
  }

  .nav-icons > a{
    margin: 2%;
    width: 25%;
    height: 30vh;
  }

  .nav-button{
    background: grey;
    background-position: center center;
    background-size: cover;
    border-radius: 6px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    display: flex;
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
</style>
