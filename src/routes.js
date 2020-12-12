import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Account from './components/Account';
import Product from './components/Product';
import User from './components/User';
import Cart from './components/Cart';
import Sells from './components/Sells';

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
    path: '/logout',
    component: Logout,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/sells',
    component: Sells,
  },
];

export default ROUTES;
