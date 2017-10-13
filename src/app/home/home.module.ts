import common from 'common/common.module';
import routes from './home.routes';
import { OfferentHomeComponent } from 'home/components/offerent_home/offerent_home.component';
//import { NombremoduloService } from 'nombremodulo/services/nombremodulo.service';

export default angular.module('app.home', [common.name])
  .config(routes)
  //.service('NombremoduloService', NombremoduloService)
  .component('offerentHome', OfferentHomeComponent);

