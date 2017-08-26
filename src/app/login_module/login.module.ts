import common from 'common/common.module';
import routes from './login.routes';
import { LoginComponent } from "./components/login/login.component";
import { LoginService } from './services/login.service';

export default angular.module('app.login', [common.name])
  .config(routes)
  .component('login', LoginComponent)
  .service('loginService', LoginService);