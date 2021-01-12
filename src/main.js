import Vue from 'vue'
import Cookies from './modules/cookies'

import App from './components/App.vue'
import Login from './components/Login.vue'

var keyUser = 'nDVjWpH8g6ifE2KakPCW'; // Cookies.getCookie();
var component = Login;

if (keyUser != null) {
  // verifica o usuário
  component = App;
}

new Vue({
  el: '#app',
  render: h => h(component, {
    props:{
      keyUser: keyUser,
      db: db
    }
  })
});