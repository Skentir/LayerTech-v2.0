import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Employees from '../views/Employees.vue';
import Chickens from '../views/Chickens.vue';
import Operations from '../views/Operations.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Suppliers.vue'),
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
];

const router = new VueRouter({
  routes,
});

export default router;
