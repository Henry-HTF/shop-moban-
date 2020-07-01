import Vue from 'vue'
import App from './App'
import config from "@/common/config.js";
import request from "@/common/request.js";
import store from "@/store/index.js";

Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$config = config;
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()