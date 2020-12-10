import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Employees from '../views/Employees.vue';
import Suppliers from '../views/Suppliers.vue';

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
    component: Suppliers,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
