<template>
  <div class="pageTemplate">
        <b-row>
            <b-col class="left-container">
                <div class="info-container">
                    <h1>{{title}}</h1>
                    <br>
                    <p>{{description}}</p>
                </div>
            </b-col>
            <b-col align-self="end" class="right-container">
                <div class= 'btn-container'>
                    <b-button>{{addLabel}}</b-button>
                </div>
            </b-col>
        </b-row>
  </div>
</template>

<script>
// import modules

export default {
  props: {
    title: String,
    description: String,
    addLabel: String,
  },
};
</script>

<style scoped>
    .pageTemplate {
        margin-top: 5vh;
        margin-bottom: 2.5vh;
        margin-left: 4vw;
        margin-right: 4vw;
    }

    .info-container {
        color: black;
    }
    .info-container h1 {
        font-weight: 700;
        font-size: 40px;
        float: left;
        margin-bottom: 13px;
    }
    .info-container p {
        font-weight: 400;
        font-size: 15px;
        float: left;
        text-align: justify;
    }
    .right-container {
        padding-bottom: 20px;
    }
    .btn-container button {
        border-radius: 6px;
        background-color: #CCF6FF;
        border-style: none;
        transition-duration: 0.4s;
        color: black;
        font-weight: bold;
        font-size: 15px;
        float: right;
    }
    button:hover {
        background-color: #36409B;
        color: white;
    }
</style>
