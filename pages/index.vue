<template >
<!-- NavBar is fixed to the top -->
  <div class="navigation">
    <b-navbar type="dark" variant="dark" fixed="top" static>
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
        <b-nav-item @click="goTorandom(currencies)">Random</b-nav-item>
      </b-nav>

 <!-- Pick Categories -->
    <div class="col-xs-3">
       <b-form-select class="selectpicker" size="sm" ref="Range" v-model="Range">
         <!-- Each option has a value associated with it which will return the specific category -->
          <option value=0>Select category</option>
          <option value=1>Top 1-10 Coins</option>
          <option value=2>Top 11-20 Coins</option>
          <option value=3>Top 21-30 Coins</option>
          <option value=4>Top 31-40 Coins</option>
          <option value=5>Top 41-50 Coins</option>
        </b-form-select>

      </div>
    </b-navbar>

<!-- Sorting dropdown -->
  <div class="form-group col-md-2">
    <b-form-select class="selectpicker" ref="currentOrder" v-model="currentOrder">
      <!-- Each option will affect how the list is displayed. It will call the function currentOrder when
      the choice is changed -->
      <option value="rank">Sort by Rank</option>
      <option value="name">Sort by Name</option>
    </b-form-select>
  </div>

    <div class="row">
      <!-- For the currently selected category, put each currency into its own card with its own details -->
      <div
        id="cards"
        v-for="(currency, index) in orderedItems(returnRange(currencies))"
        :key="currency.name"
        class="col-md-6"
      >
        <b-card bg-variant="dark" :header="currency.name" text-variant="white" class="text-center">
          <b-card-text>Rank: {{currency.rank}}</b-card-text>
          <div id="app">
            <!-- Button to load goTodetail function -->
            <b-button
              @click="goTodetail(currency.name, currency.price_usd, currency.percent_change_1h, currency.total_supply, currencies.slice(index+1,index+4))"
            >Details</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import axios from "axios";
import router from "vue-router";

export default Vue.extend({
  data() {
    return {
      // default the sort order of the list by the currencies rank
      currentOrder: "rank",
      // default the category to be the top 10 coins initially
      Range: 1,
      // empty array to put retrieved data into
      currencies: []
    };
  },
  //Retrieve a list of currencies from API provided by coinmarketcap
  mounted: function() {
    axios({
      method: "GET",
      url: "https://api.coinmarketcap.com/v1/ticker/?limit=100"
    }).then(
      result => {
        this.currencies = result.data;
      },
      error => {
        console.error(error);
      }
    );
  },
  methods: {
    toggleOrder(name: any) {
      this.currentOrder = name;
    },
    orderedItems(items: any) {
      return items.sort((a: any, b: any) =>
        a[this.currentOrder] > b[this.currentOrder] ? 1 : -1
      );
    },

// The categories are picked by the current value of Range. A spliced list is returned 
    toggleRange(range: any) {
      this.Range = range;
    },
    returnRange(currencies:any) {
      if(this.Range == 0){
        return currencies.slice(0,0);
      }
      if (this.Range == 1){
        return currencies.slice(0,10);
      }
      if (this.Range == 2){
        return currencies.slice(10,20)
      }
      if (this.Range == 3){
        return currencies.slice(20,30)
      }
      if (this.Range == 4){
        return currencies.slice(30,40)
      }
      if (this.Range == 5){
        return currencies.slice(40,50)
      }

    },

    // This loads the details page and passes through the details to be loaded
    goTodetail(Id: any, price: any, percentChange: any, totalSupply: any, nextCurrency: any) {
      this.$router.push({
        name: "details",
        params: {
          crypto_name: Id,
          price_usd: price,
          percent_change_1h: percentChange,
          total_supply: totalSupply,
          next_currency: nextCurrency
        }
      });
    },
    // This loads the random page and passes on the the whole list of currencies retrieved
    goTorandom(currenciesList: any){
      this.$router.push({
        name: "random",
        params: {
          currencies_List: currenciesList
        }
      })
    }
  },
  props: ["crypto_name", "price_usd", "percent_change_1h", "next_currency", "total_supply", "currencies_List"]
});
</script>

<style>
/* Stylise the cards with padding */
#cards {
  margin: auto;
  padding: 40px;
}
.navigation {
  padding-top: 70px;
}

body {
  background: black !important;
}
</style>
