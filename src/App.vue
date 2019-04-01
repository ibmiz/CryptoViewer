<template>
  <div id="app">
    <!-- Animate transitions when going to another page -->
<transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
   <router-view/>
</transition>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

  .page {
    position: fixed;
    width: inherit;
  }
</style>
