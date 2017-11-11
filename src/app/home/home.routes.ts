/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.adminHome', {
      url: 'adminhome',
      template: '<admin_home></admin_home>'
    })
    .state('layout.offerentHome', {
      url: 'offerenthome',
      template: '<offerent_home></offerent_home>'
    })
    .state('layout.candidateHome', {
      url: 'candidatehome',
      template: '<candidate_home></candidate_home>'
    });
}
