import Vue from 'vue'
import Json2Comp from './json2comp'
import App from './App.vue'
Vue.config.productionTip = false
Vue.component('json2comp', Json2Comp);

new Vue(App)
.$mount('#app')