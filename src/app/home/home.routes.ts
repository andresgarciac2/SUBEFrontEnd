/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.home', {
      url: 'home',
      template: '<home></home>'
    });
}
