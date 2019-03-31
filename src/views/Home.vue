<template >
  <!-- NavBar is fixed to the top -->
  <div class="index" style="myStyle">
    <b-navbar type="dark" variant="dark" fixed="top" static>
      <b-nav class="nav-items">
        <b-nav-item active router-link to="/"><span class="text-danger">Home</span></b-nav-item>
        <b-nav-item active router-link to="/random"><span class="text-light">Random</span></b-nav-item>
      </b-nav>

      <!-- Pick Categories -->
      <div class="col-xs-3">
        <b-form-select class="selectpicker" size="sm" ref="range" v-model="range">
          <!-- Each option has a value associated with it which will return the specific category -->
          <option value="0">Select category</option>
          <option value="1">Top 1-10 Coins</option>
          <option value="2">Top 11-20 Coins</option>
          <option value="3">Top 21-30 Coins</option>
          <option value="4">Top 31-40 Coins</option>
          <option value="5">Top 41-50 Coins</option>
        </b-form-select>
      </div>
    </b-navbar>

    <!-- Sorting dropdown -->
    <div class="form-group col-md-2">
      <b-form-select class="selectpicker" ref="currentOrder" v-model="currentOrder">
        <!-- Each option will affect how the list is displayed. It will call the function currentOrder when
        the choice is changed-->
        <option value="rank">Sort by Rank</option>
        <option value="name">Sort by Name</option>
      </b-form-select>
    </div>

    <div class="row">
      <!-- For the currently selected category, put each currency into its own card with its own details -->
      <div
      
        id="cards"
        v-for="currency in orderedItems(returnRange(currencies))"
        :key="currency.name"
        class="col-md-4"
      >
        <b-card bg-variant="dark" :title="currency.name" text-variant="white" class="text-center">
          <font-awesome-icon icon="coins" />
          <b-card-text>Rank: {{currency.rank}}</b-card-text>
            <!-- Button to load goTodetail function -->
            <b-button variant="danger" @click="gotoDetail(currency.rank)">Details</b-button>
        </b-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import router from "vue-router";
import { mapState } from "vuex";
import Footer from "@/components/footer.vue";

export default Vue.extend({
  components: {
    Footer
  },
  data() {
    return {
      // default the sort order of the list by the currencies rank
      currentOrder: "rank",
      // default the category to be the top 10 coins initially
      range: 1,
    };
  },

  //Retrieve a list of currencies from API provided by coinmarketcap

  mounted() {
    this.$store.dispatch("fetchCurrencies", { self: this });
  },

  computed: mapState(["currencies"]),

  methods: {
    toggleOrder(name: any) {
      this.currentOrder = name;
    },
    orderedItems(items: any) {
      if (this.currentOrder === "rank") {
        return items.sort((a: any, b: any) =>
          parseInt(a[this.currentOrder]) > parseInt(b[this.currentOrder]) ? 1 : -1
        );
      }
      else{
      return items.sort((a: any, b: any) =>
        a[this.currentOrder] > b[this.currentOrder] ? 1 : -1
      );
      }
    },

    // The categories are picked by the current value of range. A sliced list is returned
    toggleRange(range: any) {
      this.range = range;
    },
    returnRange(currencies: any) {
      if (this.range == 0) {
        return currencies.slice(0, 0);
      }
      if (this.range == 1) {
        return currencies.slice(0, 10);
      }
      if (this.range == 2) {
        return currencies.slice(10, 20);
      }
      if (this.range == 3) {
        return currencies.slice(20, 30);
      }
      if (this.range == 4) {
        return currencies.slice(30, 40);
      }
      if (this.range == 5) {
        return currencies.slice(40, 50);
      }
    },

    // This loads the details page and passes through the details to be loaded
    gotoDetail(rank: any) {
      this.$router.push({
        name: "details",
        params: {
          currencyRank: rank
        }
      });
    }
  }
});
</script>

<style>
/* Use Roboto Font */
@import url("https://fonts.googleapis.com/css?family=Roboto");

/* Stylise the cards with padding */
#cards {
  margin: auto;
  padding: 40px;
}
/* Padding for navbar to prevent content overlapping */
.index {
  padding-top: 70px;
}


body {
  min-height: 100vh;
  position: relative;
  margin: 0;
  background: black !important;
  padding-bottom: 100px;
  font-family: 'Roboto';
}
</style>
