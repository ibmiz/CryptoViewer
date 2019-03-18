<template >
  <div class="navigation">
    <b-navbar type="dark" variant="dark" fixed="top" static>
      <b-nav>
        <b-nav-item active router-link to="/">Home</b-nav-item>
        <b-nav-item active router-link to="/random">Random</b-nav-item>
      </b-nav>

 
    <div class="col-xs-3">
       <b-form-select class="selectpicker" size="sm" ref="Range" v-model="Range">
          <option value=0>Select category</option>
          <option value=1>0-10</option>
          <option value=2>10-20</option>
        </b-form-select>

      </div>
    </b-navbar>

  <div class="form-group col-md-2">
    <b-form-select class="selectpicker" ref="currentOrder" v-model="currentOrder">
      <option value="rank">Sort by Rank</option>
      <option value="name">Sort by Name</option>
    </b-form-select>
  </div>

    <div class="row">
      <div
        id="cards"
        v-for="(currency, index) in orderedItems(returnRange(currencies))"
        :key="currency.name"
        class="col-md-6"
      >
        <b-card bg-variant="dark" :header="currency.name" text-variant="white" class="text-center">
          <div id="app">
            <b-button
              @click="goTodetail(currency.name, currency.price_usd, currency.percent_change_1h, currencies.slice(index+1,index+4))"
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
      currentOrder: "rank",
      Range: 0,
      currencies: []
    };
  },
  mounted: function() {
    axios({
      method: "GET",
      url: "https://api.coinmarketcap.com/v1/ticker/?limit=100"
    }).then(
      result => {
        this.currencies = result.data;
        console.log(result.data);
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
        return currencies.slice(11,20)
      }
    },
    goTodetail(Id: any, price: any, percentChange: any, nextCurrency: any) {
      this.$router.push({
        name: "details",
        params: {
          crypto_name: Id,
          price_usd: price,
          percent_change_1h: percentChange,
          next_currency: nextCurrency
        }
      });
    }
  },
  props: ["name", "price_usd", "percent_change_1h", "next_currency"]
});
</script>

<style>
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
