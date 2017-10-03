import common from 'common/common.module';
import routes from './register_offerent.routes';
import {RegisterOfferentComponent} from "./components/register_offerent/register_offerent.component";
import { RegisterOfferentService } from './services/register_offerent.service';

export default angular.module('app.registerOfferent', [common.name])
  .config(routes)
  .component('registerOfferent', RegisterOfferentComponent)
  .service('registerOfferentService', RegisterOfferentService);