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
      :title="currenciesList[selected].name"
    >
      <b-card-text>Rank is: {{currenciesList[selected].rank}}</b-card-text>
      <b-card-text>Price is: ${{Number (parseFloat(currenciesList[selected].price_usd).toPrecision(3))}}</b-card-text>
      <b-button @click="pickRandom" variant="primary">Random</b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import router from "vue-router";

export default Vue.extend({
  data() {
    return {
      randomId: 1,
      currenciesList: this.$route.params.currencies_List
    };
  },
  methods: {
    pickRandom() {
      this.randomId = Math.floor(Math.random() * this.currenciesList.length);
    }
  },
  computed: {
    selected(): any {
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