import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Employees from '../views/Employees.vue';
import Suppliers from '../views/Suppliers.vue';
import Chickens from '../views/Chickens.vue';
import Operations from '../views/Operations.vue';
import Warehouse from '../views/Warehouse.vue';
import ERROR404 from '../components/error404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
  },
  {
    path: '/chickens',
    name: 'Chickens',
    component: Chickens,
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations,
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    component: Warehouse,
  },
  {
    path: '*',
    name: 'Error 404',
    component: ERROR404,
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // check the meta field
    if (JSON.parse(localStorage.getItem('auth-token'))) { // check if the user is authenticated
      next(); // the next method allow the user to continue to the router
    } else {
      next('/'); // Redirect the user to the main page
    }
  } else {
    next();
  }
});

export default router;
