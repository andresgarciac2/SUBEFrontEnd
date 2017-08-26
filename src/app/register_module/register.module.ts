import common from 'common/common.module';
import routes from './register.routes';
import {RegisterComponent} from "./components/register/register.component";
import { RegisterService } from './services/register.service';

export default angular.module('app.register', [common.name])
  .config(routes)
  .component('register', RegisterComponent)
  .service('registerService', RegisterService);