import common from 'common/common.module';
import routes from './home.routes';
import { AdminHomeComponent } from "home/components/admin_home/admin_home.component";
import { OfferentHomeComponent } from 'home/components/offerent_home/offerent_home.component';
import { HomeService } from './services/home.service';

export default angular.module('app.home', [common.name])
  .config(routes)
  .service('homeService', HomeService)
  .component('adminHome', AdminHomeComponent)
  .component('offerentHome', OfferentHomeComponent);