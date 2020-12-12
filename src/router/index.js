import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Employees from '../views/Employees.vue';
import Suppliers from '../views/Suppliers.vue';
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
    component: Suppliers,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
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
