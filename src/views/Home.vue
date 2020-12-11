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
              <div class="alerts-box">
                <div class="alert alert-red">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
              </div>
            </v-col>
            <v-col cols="6" id="warehouse-alerts" class="alerts-group"> <!-- Warehouse alerts-->
              <span class="label">Warehouse</span>
              <div class="alerts-box">
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-red">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" id="operations-alerts" class="alerts-group"> <!-- Operations alerts -->
              <span class="label">Operations</span>
              <div class="alerts-box">
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-red">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-yellow">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
                <div class="alert alert-red">
                  <span class="icon-notif"></span><span>This is a notification</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="quick-nav">
          <p class="heading">Quick Navigation</p>
          <div class="nav-icons"> <!-- Navigation Buttons -->
            <a href="">
              <div id="nav-accounting" class="nav-button">
                <span class="nav-label">Accounting</span>
              </div>
            </a>
            <a href="">
              <div id="nav-warehouse" class="nav-button">
                <span class="nav-label">Warehouse</span>
              </div>
            </a>
            <a href="">
              <div id="nav-operations" class="nav-button">
                <span class="nav-label">Operations</span>
              </div>
            </a>
            <a href="#/Employees">
              <div id="nav-suppliers" class="nav-button">
                <span class="nav-label">Suppliers</span>
              </div>
            </a>
            <a href="">
              <div id="nav-transactions" class="nav-button">
                <span class="nav-label">Transactions</span>
              </div>
            </a>
            <a href="">
              <div id="nav-reports" class="nav-button">
                <span class="nav-label">Reports</span>
              </div>
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      accountingNotifIsEmpty: false,
      warehouseNotifIsEmpty: true,
      operationsNotifIsEmpty: false,
    };
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
    padding: 2px;
  }

  .nav-button{
    border-radius: 6px;
    width: 25vw;
    height: 30vh;
    background-image: linear-gradient(#FFFFFF, #041A7D);
    position: relative;
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
