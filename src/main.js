import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/common.css'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import { Toast ,Dialog  } from 'vant';
Vue.use(Toast);
Vue.prototype.$Toast = Toast
Vue.prototype.$Dialog = Dialog
import loading from '@/components/loading/index.js'
Vue.use(loading)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
