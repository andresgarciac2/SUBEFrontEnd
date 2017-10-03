import common from 'common/common.module';
import routes from './register_candidate.routes';
import {RegisterCandidateComponent} from "./components/register_candidate/register_candidate.component";
import { RegisterCandidateService } from './services/register_candidate.service';

export default angular.module('app.registerCandidate', [common.name])
  .config(routes)
  .component('registerCandidate', RegisterCandidateComponent)
  .service('registerCandidateService', RegisterCandidateService);