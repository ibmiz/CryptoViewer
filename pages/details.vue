<template>
<div>
   <b-navbar type="dark" variant="dark"  fixed="top">
  <b-nav>
    <b-nav-item active router-link to="/">Home</b-nav-item>
  </b-nav>
   </b-navbar>

 <div class="details">
    <b-card
        border-variant="primary"
        header="Primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
        :title=this.$route.params.crypto_name
      >
        <b-card-text>Current price is : ${{this.$route.params.price_usd}}</b-card-text>
        <b-card-text>Percentage change is : {{this.$route.params.percent_change_1h}}</b-card-text>
      </b-card>
 </div>

 </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator"

 export default Vue.extend({
  name:'details',
  data (){
   return{
    Id:this.$route.params.crypto_name,
    title:'Details'
   }
  }
 })
</script>

<style scoped>
 
</style>