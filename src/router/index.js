import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import helloworld from '../components/HelloWorld.vue'

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
      auth: true
    }
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('../views/Master/Role/Role.vue'),
    meta: { 
      auth: true 
    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import( '../views/Master/Customers/Customers.vue'),
    meta: { 
      auth: true 
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import( '../views/Master/Menu/Menu.vue'),
    meta: { 
      auth: true 
    }
  },
  {
    path: '/menudetail',
    name: 'MenuDetail',
    component: () => import( '../views/Master/MenuDetail/MenuDetail.vue'),
    meta: { 
      auth: true 
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
      auth: true 
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
    path:'/helloworld',
    name: 'HelloWorld',
    component: helloworld,
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
      return
    }
    next('/')
  }

  next()
})

export default router
