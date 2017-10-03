/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.registerOfferent', {
      url: 'registerofferent',
      template: '<register_offerent></register_offerent>'
    });
}
