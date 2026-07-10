import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/nosotros', name: 'about', component: AboutView },
    { path: '/catalogo', name: 'catalog', component: CatalogView },
    { path: '/carrito', name: 'cart', component: CartView },
    { path: '/admin', name: 'admin', component: AdminView }
  ]
})

export default router
