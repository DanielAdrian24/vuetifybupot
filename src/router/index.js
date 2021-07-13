import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
// import helloworld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { hideNavigation: true },
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Master/User/User.vue'),
    meta:{
      auth: true,
      admin:true
    }
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('../views/Master/Role/Role.vue'),
    meta: { 
      auth: true,
      admin:true 
    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import( '../views/Master/Customers/Customers.vue'),
    meta: { 
      auth: true,
      admin:true 
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import( '../views/Master/Menu/Menu.vue'),
    meta: { 
      auth: true,
      admin:true 
    }
  },
  {
    path: '/menudetail',
    name: 'MenuDetail',
    component: () => import( '../views/Master/MenuDetail/MenuDetail.vue'),
    meta: { 
      auth: true,
      admin:true 
    }
  },
  {
    path: '/inputTrx',
    name: 'InputTrx',
    component: () => import( '../views/Master/InputTrx/InputTrx.vue'),
    meta: { 
      auth: true 
    }
  },
  {
    path: '/trxPage',
    name: 'TrxPage',
    component: () => import( '../views/Master/TrxPage/TrxPage.vue'),
    meta: { 
      redirectValidator: true 
    }
  },
  {
    path: '/detailbupot/:id',
    name: 'DetailBupot',
    component: () => import( '../views/Master/TrxPage/DetailBupot.vue'),
    meta: { 
      auth: true
    }
  },
  {
    path: '/inputinquirybupot',
    name: 'InputInquiryBupot',
    component: () => import( '../views/Master/TrxPage/InputInquiryBupot.vue'),
    meta: { 
      auth: true
    }
  },
  {
    path: '/trxpagekasir',
    name: 'TrxPageKasir',
    component: () => import( '../views/Master/TrxPageKasir/TrxPageKasir.vue'),
    meta: { 
      auth: true,
      kasir:true 
    }
  },
  {
    path: '/trxpagevalidator',
    name: 'TrxPageValidator',
    component: () => import( '../views/Master/TrxPageValidasi/TrxPageValidasi.vue'),
    meta: { 
      auth: true,
      auth_validator: true 
    }
  },
  {
    path: '/detailbupotvalidator/:id',
    name: 'DetailBupotValidator',
    component: () => import( '../views/Master/TrxPageValidasi/DetailBupotValidator.vue'),
    meta: { 
      auth: true,
      auth_validator: true 
    }
  },
  {
    path:'/foradmin',
    name: 'ForAdmin',
    component: () => import( '../components/ForAdmin.vue'),
    meta: {
      auth: true
    }
  },
  {
    path:'/forvalidator',
    name: 'ForValidator',
    component: () => import( '../components/ForValidator.vue'),
    meta: {
      auth: true
    }
  },
  {
    path:'/forkasir',
    name: 'ForKasir',
    component: () => import( '../components/ForKasir.vue'),
    meta: {
      auth: true
    }
  },
  {
    path:'/pdf',
    name: 'Pdf',
    component: () => import( '../views/Master/Pdf/Pdf.vue')
  },
  {
    path:'/forkasir2',
    name: 'ForKasir2',
    component: () => import( '../components/ForKasir2.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      if (to.matched.some(record => record.meta.kasir)){
        if(store.getters.user.role_id == 1){
          next()
        }else{
          next('/forkasir')
        }
      }
      if (to.matched.some(record => record.meta.auth_validator)){
        if(store.getters.user.role_id == 2 || store.getters.user.role_id == 1){
          next()
        }else{
          next('/forvalidator')
        }
      }
      if (to.matched.some(record => record.meta.admin)){
        if(store.getters.user.role_id == 1){
          next()
        }else{
          next('/foradmin')
        }
      }
      return
    } else {
      next('/')
    }
  }
  next()
})

export default router
