/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.offerentHome', {
      url: 'offerenthome',
      template: '<offerent_home></offerent_home>'
    });
}
