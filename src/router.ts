import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/random",
      name: "random",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Random.vue"),
    },
    {
      path: "/details",
      name: "details",
      component: () => import(/* webpackChunkName: "about" */ "./views/Details.vue"),
    },
    // catch all use case
    { path: "*", redirect: "/" },
  ],
});
