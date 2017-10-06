import common from 'common/common.module';
import routes from './offert.routes';
import {OffertComponent} from "./components/offert/offert.component";
import { OffertService } from './services/offert.service';

export default angular.module('app.offert', [common.name])
  .config(routes)
  .component('offert', OffertComponent)
  .service('offertService', OffertService);