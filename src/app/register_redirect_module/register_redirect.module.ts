import common from 'common/common.module';
import routes from './register_redirect.routes';
import {RegisterRedirectComponent} from "./components/register_redirect/register_redirect.component";

export default angular.module('app.registerRedirect', [common.name])
  .config(routes)
  .component('registerRedirect', RegisterRedirectComponent);