import RegisterCandidateController from './register_candidate.controller';

export const RegisterCandidateComponent: angular.IComponentOptions = {
  templateUrl: 'app/register_candidate_module/components/register_candidate/register_candidate.html',
  controller: RegisterCandidateController,
  controllerAs: 'vm',
  bindings:{
    reset:'=',
    edit: '=',
    user: '=',
    usuario: '=',
    brokers:'=',
    roles:'='
  }
};
