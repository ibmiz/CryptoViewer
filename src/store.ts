import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    currencies: [],
  },
  // Store currencies retrieved into current state
  mutations: {
    FETCH_CURRENCIES(state, currencies) {
      state.currencies = currencies;
    },

  },
  actions: {
    // Method to get list of currencies from public api
    fetchCurrencies({commit}) {
      axios
        .get("https://api.coinmarketcap.com/v1/ticker/?limit=100")
        .then((result) => {
          commit("FETCH_CURRENCIES", result.data);
        },
        (error) => {
          console.error(error);
        },
      );
    },
  },
});
