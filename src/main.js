import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

Vue.config.productionTip = false
const token = localStorage.getItem('token');
if (token) { 
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token 
}

store.dispatch('get_user', token)
.then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}).catch((error) => {
  console.error(error);
})

