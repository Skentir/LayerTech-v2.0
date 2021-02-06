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
    meta: { requiresAuth: true, adminOnly: true },
  },
  {
    path: '/chickens',
    name: 'Chickens',
    component: Chickens,
    meta: { requiresAuth: true },
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations,
    meta: { requiresAuth: true },
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    component: Warehouse,
    meta: { requiresAuth: true },
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
  }

  if (to.meta.adminOnly) { // check the meta field
    if (JSON.parse(localStorage.getItem('role')).toLowerCase() === 'admin') { // check if the user's role is admin
      next(); // the next method allow the user to continue to the router
    } else {
      next('/'); // Redirect the user to the main page
    }
  }
  // default move
  next();
});

export default router;
