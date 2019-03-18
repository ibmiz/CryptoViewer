<template>
  <div>
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
      </b-nav>
    </b-navbar>

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
        <b-card-text>Current price is: ${{price_usd}}</b-card-text>
        <b-card-text>Percentage change is: {{percent_change_1h}}%</b-card-text>
      </b-card>

      <h2 class="text-white bg-dark, text-center"> Next 3 coins</h2>

      <div
        id="cards"
        v-for="currency in nextCurrency"
        :key="currency.name"
        class="col-md-6"
      >
        <b-card bg-variant="dark" :header="currency.name" text-variant="white" class="text-center">
          <b-card-text>Current price is: ${{currency.price_usd}}</b-card-text>
          <b-card-text>Percentage change is: {{currency.percent_change_1h}}%</b-card-text>
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
      Id: this.$route.params.crypto_name,
      price_usd: this.$route.params.price_usd,
      percent_change_1h: this.$route.params.percent_change_1h,
      nextCurrency: this.$route.params.next_currency,
      title: "Details"
    };
  }
});
</script>

<style scoped>
</style>