import Vue from 'vue';
import './services/socket-service';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App';
import router from './router';

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  render: createElement => createElement(App),
  router,
}).$mount('#app');
