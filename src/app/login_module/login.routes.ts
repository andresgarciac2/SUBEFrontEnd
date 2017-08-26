/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.login', {
      url: 'login?e',
      template: '<login></login>'
    });
}
