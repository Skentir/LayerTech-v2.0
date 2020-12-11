<template>
  <div class="home">
    <div class="header">
      <div class="image-banner">
        <v-row no-gutters class="image-banner-text">
          <v-col cols="8" class="farm-title">
            <span id="farm-title">Wanmin Restaurant</span>
          </v-col>
          <v-col cols="4" class="location-title">
            <span id="location-title">Chihu Rock, Liyue Harbor, Liyue</span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="content">
        <div class="alerts">
          <p class="heading">Alerts</p>
          <v-row id="accounting-warehouse-group">
            <v-col cols="6" id="accounting-alerts" class="alerts-group">
              <span class="label">Accounting</span>
              <div class="alerts-box">
                <div class="alert alert-red">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
              </div>
            </v-col>
            <v-col cols="6" id="warehouse-alerts" class="alerts-group">
              <span class="label">Warehouse</span>
              <div class="alerts-box">
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-red">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" id="operations-alerts" class="alerts-group">
              <span class="label">Operations</span>
              <div class="alerts-box">
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-red">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-yellow">
                  <p>This is a notification</p>
                </div>
                <div class="alert alert-red">
                  <p>This is a notification</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="quick-nav">
          <p class="heading">Quick Navigation</p>
          <div class="nav-icons">
            <div class="nav-button">
            </div>
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
    bottom:0px;
    left:10px;
    text-align: left;
  }

  .location-title {
    font-weight: normal;
    color: rgb(255, 255, 255);
    font-size: 20px;
    position: absolute;
    bottom:18px;
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

  .alerts-box > .alert{
    margin-bottom: 5px;
    padding: 7px;
    border-radius: 5px;
    vertical-align: center;
  }

  .alerts-box > .alert > p{
    margin: auto;
    font-size: 20px;
  }

  .alerts-box > .alert.alert-red{
    background-color: #F65757;
  }

  .alerts-box > .alert.alert-yellow{
    background-color: #FCF5B7;
  }

  .nav-icons{
    display: flex;
  }
</style>
