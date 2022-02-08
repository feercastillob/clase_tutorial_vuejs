import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Navigation from '../views/Navigation.vue'
import Cobros from '../views/Cobros.vue'
import Planteles from '../views/Planteles.vue'
import Alumnos from '../views/Alumnos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/nav',
    name: 'nav',
    component: Navigation,
    children: [
      {
        path: '/cobros',
        name: 'Cobros',
        component: Cobros,
      },
      {
        path: '/planteles',
        name: 'Planteles',
        component: Planteles
      },
      {
        path: '/alumnos',
        name: 'Alumnos',
        component: Alumnos
      },
    ]
  },
 
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
