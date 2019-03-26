<template>
  <div>
    <!-- NavBar to link back to homepage -->
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
      </b-nav>
    </b-navbar>

    <!-- The top section will show cryptocurrencies details -->
    <div class="details">
      <b-card
        bg-variant="dark"
        text-variant="white"
        header="Primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
        :title="Id"
      >
        <b-card-text>Current price is: $ {{price_usd}}</b-card-text>
        <b-card-text>Percentage change in 1 hour is: {{percent_change_1h}}%</b-card-text>
        <b-card-text>Total Supply is: {{total_supply}}</b-card-text>
      </b-card>

      <h2 class="text-white bg-dark, text-center">Next 3 coins</h2>

      <!-- Display the next 3 cryptocurrencies in its own card -->
      <div id="cards" v-for="currency in nextCurrency" :key="currency.name" class="col-md-6">
        <b-card bg-variant="dark" :header="currency.name" text-variant="white" class="text-center">

          <!-- The price is rounded to 3 significant figures for easier reading -->
          <b-card-text>Current price is: $ {{Number (parseFloat(currency.price_usd).toPrecision(3))}}</b-card-text>
          <b-card-text>Percentage change in 1 hour is: {{currency.percent_change_1h}}%</b-card-text>
          <b-card-text>Total Supply is: {{currency.total_supply}}</b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

export default Vue.extend({
  name: "details",
  data() {
    return {
      // Assign each data item to the values pushed through by the router 
      Id: this.$route.params.crypto_name,
      price_usd: Number (parseFloat(this.$route.params.price_usd).toPrecision(3)),
      percent_change_1h: this.$route.params.percent_change_1h,
      total_supply: this.$route.params.total_supply,
      nextCurrency: this.$route.params.next_currency,
      title: "Details"
    };
  }
});
</script>