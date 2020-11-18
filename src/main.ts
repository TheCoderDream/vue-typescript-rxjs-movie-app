import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters';

Vue.config.productionTip = false;

Vue.filter('calcTime', filters.calcTime);
Vue.filter('convertMoney', filters.convertMoney);
Vue.filter('overviewShorter', filters.overviewShorter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
