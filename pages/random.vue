<template>
  <div>
    <!-- NavBar is links back to Home -->
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
      </b-nav>
    </b-navbar>

<!-- Display the randomly chosen cryptocurrency in a card -->
    <b-card
      class="text-center"
      bg-variant="dark"
      text-variant="white"
      :title="currenciesList[selected].name"
    >
      <b-card-text>Rank is: {{currenciesList[selected].rank}}</b-card-text>
      <!-- Round price to 3 siginificant figures -->
      <b-card-text>Price is: ${{Number (parseFloat(currenciesList[selected].price_usd).toPrecision(3))}}</b-card-text>
      <!-- When the random button is clicked, the function pickRandom() is called -->
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
      // Assign currenciesList to data pushed through from router
      // randomId starts off with 1 initially to prevent an index error
      randomId: 1,
      currenciesList: this.$route.params.currencies_List
    };
  },
  methods: {
    // randomly pick a number within the range of how many currencies there are to avoid an index error
    pickRandom() {
      this.randomId = Math.floor(Math.random() * this.currenciesList.length);
    }
  },
  computed: {
    // compute randomId's value
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