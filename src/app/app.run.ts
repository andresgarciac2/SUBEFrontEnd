import { Environment } from 'common/environment/environment';
import { SessionService } from 'common/components/security/session.service';
import { CookieConstants } from 'common/environment/cookieConstants'
import { unsecuredRoutes } from 'common/environment/unsecuredRoutes';
import { generalRoutes } from 'common/environment/generalRoutes';
import { ShowMessagesService } from 'common/services/show_messages.service';

/** @ngInject */
export default function run($log: angular.ILogService,
                    $cookies: ng.cookies.ICookiesService,
                    $rootScope: ng.IRootScopeService,
                    $state: ng.ui.IStateService,
                    $translate: ng.translate.ITranslateService,
                    $window: ng.IWindowService,
                    environment: Environment,
                    sessionService: SessionService,
                    cookieConstants: CookieConstants,
                    showMessagesService : ShowMessagesService) {
  $log.debug(`Portal Intermediarios en modo ${environment.name}`);

  // event fired when state is starting to change
  $rootScope.$on('$stateChangeStart', function (event: ng.IAngularEvent,
                                                toState: any, toParams: any,
                                                fromState: any, fromParams: any) {
 
    // route authentication
    if (unsecuredRoutes.indexOf(toState.name) > -1) {
      // unsecured route || secured route & authenticated user
      $cookies.put(toState, toState.url);
      return;
    } else if (generalRoutes.indexOf(toState.name) > -1 && sessionService.isMemberAuthenticated()) {
      // unsecured route || secured route & authenticated user
      $cookies.put(toState, toState.url);
      return;
    } else if (sessionService.validState(toState.name) && sessionService.isMemberAuthenticated()) {
      // unsecured route || secured route & authenticated user
      $cookies.put(toState, toState.url);
      return;
    } else {
      // unauthorized access
      // 1. stop state change
      event.preventDefault();
      // 2. clean cookies (if there are any available)
      sessionService.cleanAuthenticationCookies();
      // 3. redirect to login page
      let currentState = $cookies.get(cookieConstants.currentState);
      currentState = '';
      $window.location.href = sessionService.getLoginUrl(environment) + currentState;      
    }
  });
 
  // event fired when view is loaded
  $rootScope.$on('$viewContentLoaded', () => {
    let currentUrl: any = $state.current.url;    
  });
}
