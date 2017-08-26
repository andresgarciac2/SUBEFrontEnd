/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.register', {
      url: 'register',
      template: '<register></register>'
    });
}
