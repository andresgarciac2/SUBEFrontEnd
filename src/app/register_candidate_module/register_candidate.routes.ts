/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout.registerCandidate', {
      url: 'registercandidate',
      template: '<register_candidate></register_candidate>',
      params: {
          'user': undefined
      }
    });
}
