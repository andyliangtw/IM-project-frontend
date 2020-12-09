import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import User from './components/User';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: Main,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/user',
    component: User,
  },
];

export default ROUTES;
