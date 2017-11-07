import RegisterOfferentController from './register_offerent.controller';

export const RegisterOfferentComponent: angular.IComponentOptions = {
  templateUrl: 'app/register_offerent_module/components/register_offerent/register_offerent.html',
  controller: RegisterOfferentController,
  controllerAs: 'vm',
  bindings:{
    user: '='
  }
};
