// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import store from './store/store'
import * as firebase from 'firebase'
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
