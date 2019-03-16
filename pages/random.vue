<template>
  <div>
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
      </b-nav>
    </b-navbar>

    <b-card
      class="text-center"
      bg-variant="dark"
      text-variant="white"
      :title="randomcurrencies[selected].name"
    >
      <b-card-text>Price is: ${{randomcurrencies[selected].price_usd}}</b-card-text>
      <b-button @click="pickRandom" variant="primary">Random</b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator"
import axios from "axios";
import router from 'vue-router'


export default Vue.extend( {

data () {
    return {
      randomId: null
    }
  },
  asyncData() {
    return axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=50")
      .then(response => {
        return {
          randomcurrencies: response.data
        };
      });
  },
  methods: {
    pickRandom() {
      this.randomId = Math.floor(Math.random() * this.randomcurrencies.length);
    }
  },
  computed: {
    selected():any {
      return this.randomId || 1;
    }
  }
});
</script>

<style scoped>
.card {
  padding: 50px;
}
</style>