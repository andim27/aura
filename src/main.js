import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueKonva from 'vue-konva'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueKonva)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.mixin(
  {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
)
new Vue({
  render: h => h(App)
}).$mount('#app')
