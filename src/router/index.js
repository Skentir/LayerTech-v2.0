import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Employees from '../views/Employees.vue';
import Chickens from '../views/Chickens.vue';
import Operations from '../views/Operations.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
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
];

const router = new VueRouter({
  routes,
});

export default router;
