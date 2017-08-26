/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider,
                       $locationProvider: angular.ILocationProvider,
                       $logProvider: angular.ILogProvider) {

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $logProvider.debugEnabled(true);

  $urlRouterProvider.otherwise(function ($injector: angular.auto.IInjectorService) {
    let $state = $injector.get<angular.ui.IStateService>('$state');
    $state.go('layout.404');
  });

  $stateProvider
    .state('default', {
      url: '',
      onEnter: ['$state', function ($state: angular.ui.IStateService) {
        $state.go('layout.login');
      }]
    })
    .state('slash', {
      url: '/',
      onEnter: ['$state', function ($state: angular.ui.IStateService) {
        $state.go('layout.login');
      }]
    })
    .state('layout', {
      url: '/',
      template: '<app-root></app-root>'
    })
    .state('layout.404', {
      url: '404',
      template: `NOT FOUND`
    });
}
