import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import PairsRoute from '@routes/pairs.route';
import FarmsRoute from '@routes/farms.route';
import PoolsRoute from '@routes/pools.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new PairsRoute(),
  new FarmsRoute(),
  new PoolsRoute()
]);

app.listen();
