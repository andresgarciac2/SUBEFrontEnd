import common from 'common/common.module';
import routes from './home.routes';
import { HomeComponent } from 'home/components/home/home.component';
//import { NombremoduloService } from 'nombremodulo/services/nombremodulo.service';

export default angular.module('app.home', [common.name])
  .config(routes)
  //.service('NombremoduloService', NombremoduloService)
  .component('home', HomeComponent);

