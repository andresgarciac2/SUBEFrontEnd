import common from 'common/common.module';
import routes from './offert.routes';
import {OffertComponent} from "./components/offert/offert.component";
import {StepComponent} from "./components/step/step.component";
import {OfferDetailComponent} from "./components/offer_detail/offer_detail.component";
import { OffertService } from './services/offert.service';

export default angular.module('app.offert', [common.name])
  .config(routes)
  .component('offert', OffertComponent)
  .component('step', StepComponent)
  .component('offerDetail', OfferDetailComponent)
  .service('offertService', OffertService);