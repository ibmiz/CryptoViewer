<template>
  <div>
    <!-- NavBar to link back to homepage -->
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-nav>
        <b-nav-item active router-link to="/">
          <span class="text-danger"><font-awesome-icon icon="home"/> Home</span>
        </b-nav-item>
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
        :title="currencies[rank-1].name"
      >
        <font-awesome-icon icon="coins"/>
        <b-card-text>
          Current price is: $ {{Number(
          parseFloat(currencies[rank-1].price_usd).toPrecision(3)
          )}}
        </b-card-text>
        <b-card-text
          :class="color"
        >Percentage change in 1 hour is: {{currencies[rank-1].percent_change_1h}}%</b-card-text>
        <b-card-text>Total Supply is: {{currencies[rank-1].total_supply}}</b-card-text>
      </b-card>

      <h2 class="text-white bg-dark, text-center">Next 3 coins</h2>

      <!-- Display the next 3 cryptocurrencies in its own card -->
      <div id="cards" v-for="currency in nextCurrency" :key="currency.name" class="col-md-6">
        <b-card bg-variant="dark" :title="currency.name" text-variant="white" class="text-center">
          <font-awesome-icon icon="coins"/>
          <!-- The price is rounded to 3 significant figures for easier reading -->
          <b-card-text>Current price is: $ {{Number (parseFloat(currency.price_usd).toPrecision(3))}}</b-card-text>
          <b-card-text>Percentage change in 1 hour is: {{currency.percent_change_1h}}%</b-card-text>
          <b-card-text>Total Supply is: {{currency.total_supply}}</b-card-text>
        </b-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Footer from "@/components/footer.vue";

export default Vue.extend({
  name: "details",
  // Add footer components
  components: {
    Footer,
  },
  data() {
    return {
      // Assign each data item to the values pushed through by the router
      rank: this.$route.params.currencyRank,
      currencies: this.$store.state.currencies,
      nextCurrency: this.$store.state.currencies.slice(
        parseInt(this.$route.params.currencyRank),
        parseInt(this.$route.params.currencyRank) + 3,
      ),
      title: "Details",
    };
  },
  computed: {
    // This will change the colour of the text to red or green depending on if the value is negative or not
    color(): any {
      return this.$store.state.currencies[this.$route.params.currencyRank - 1]
        .percent_change_1h > 0
        ? "inc"
        : "dec";
    },
  },
});
</script>

<style scoped>
.inc {
  color: green;
}
.dec {
  color: red;
}
</style>
F