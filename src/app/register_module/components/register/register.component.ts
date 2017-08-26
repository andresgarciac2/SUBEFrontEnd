import RegisterController from './register.controller';

export const RegisterComponent: angular.IComponentOptions = {
  templateUrl: 'app/register_module/components/register/register.html',
  controller: RegisterController,
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
