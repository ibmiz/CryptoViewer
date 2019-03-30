<template>
  <div class="home">
    <Index/>
    <Footer></Footer>
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import Index from '@/components/Index.vue'; // @ is an alias to /src
import Footer from '@/components/footer.vue';

export default Vue.extend({
  name: 'home',
  components: {
    Index,
    Footer
  },
});
</script>
