import common from 'common/common.module';
import routes from './postulation.routes';
import { PostulationComponent } from "./components/postulation/postulation.component";

export default angular.module('app.postulation', [common.name])
    .config(routes)
    .component('postulation', PostulationComponent);
