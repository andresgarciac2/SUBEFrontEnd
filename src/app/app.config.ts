import {HttpGlobalInterceptor} from 'common/security/http-global.interceptor';

/** @ngInject */
export function config($cookiesProvider: any,
                       $httpProvider: any,
                       $locationProvider: angular.ILocationProvider,
                       $logProvider: angular.ILogProvider) {
  // location config
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
 
  // log config
  $logProvider.debugEnabled(true);
 
  // http config
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.interceptors.push(HttpGlobalInterceptor);
 
  // cookies config
  $cookiesProvider.defaults.path = '/';
  $cookiesProvider.defaults.domain = location.hostname;
}