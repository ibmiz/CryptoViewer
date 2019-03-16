<template>
  <div>
      <b-navbar type="dark" variant="dark" fixed="top" static>
        <b-nav>
          <b-nav-item active router-link to="/">Home</b-nav-item>
          <b-nav-item-dropdown text="Categories" right>
            <b-dropdown-item href="#">Name(ASC)</b-dropdown-item>
            <b-dropdown-item href="#">Name(DESC)</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item active router-link to="/random">Random</b-nav-item>
            <select v-model="currentOrder">
            <option value="rank">Sort by Rank</option>
            <option value="name">Sort by Name</option>
                </select>
        </b-nav>
      </b-navbar>
      <div id="cards" v-for="currency in orderedItems(currencies)" :key="currency.name">

  <div>
    <div class="card text-center">
      <div class="card-header">
      </div>
      <div class="card-body">
        <h5 class="card-title">{{currency.name}}</h5>
        <div id="app">
          <b-button @click="goTodetail(currency.name, currency.price_usd, currency.percent_change_1h)">Details</b-button>
        </div>
      </div>
    </div>
  </div>

  </div>

  
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator"
import axios from 'axios'
import router from 'vue-router'

export default Vue.extend( {

data () {
    return {
      currentOrder: 'rank',
      currencies : []
    }
  },
  mounted : function(){
    axios({ method: "GET", "url": "https://api.coinmarketcap.com/v1/ticker/?limit=10" })
    .then(result => {
        this.currencies = result.data;
    }, error => {
        console.error(error);
    })
  },
 methods: {
        toggleOrder(name: any) {
            this.currentOrder = name;
        },
        orderedItems(items: any) {
          return items.sort((a:any, b:any) => (a[this.currentOrder] > b[this.currentOrder]) ? 1 : -1)  
        },
          goTodetail(Id:any, price:any, percentChange:any) {
    this.$router.push({name:'details',params:{crypto_name:Id, price_usd:price, percent_change_1h:percentChange}})
  } 
    },
  props: ["name", "price_usd", "percent_change_1h"]

})
</script>

<style scoped>
#cards {
  margin: auto;
  padding: 40px;
}
body { padding: 70px; }
</style>
