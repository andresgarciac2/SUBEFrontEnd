import { Environment } from '../environment/environment';
import { CookieConstants } from '../environment/cookieConstants'
import { SessionService } from '../components/security/session.service';
import { ShowMessagesService } from '../services/show_messages.service';

/** @ngInject */
export function HttpGlobalInterceptor($q: ng.IQService,
                                      $cookies: ng.cookies.ICookiesService,
                                      $injector: ng.auto.IInjectorService,
                                      environment: Environment,
                                      sessionService: SessionService,
                                      cookieConstants: CookieConstants,
                                      showMessagesService: ShowMessagesService,
                                      $window: ng.IWindowService): ng.IHttpInterceptor {

  return {
    responseError: (rejection: any) => {
      let errorMssg = "Su sesión ha expirado, por favor ingrese nuevamente";
      let $state: ng.ui.IStateService = $injector.get<ng.ui.IStateService>('$state');
      //let showMessagesService: showMessagesService = $injector.get<showMessagesService>('showMessagesService');
      if (rejection.status === 401) {
        // 1. clean cookies (if there are any available)
        sessionService.cleanAuthenticationCookies();
        // 2. redirect to login page
        let currentState = $cookies.get(cookieConstants.currentState);
      currentState = '';
      $window.location.href = sessionService.getLoginUrl(environment) + '?e=unauthorized'; 
      showMessagesService.showAlert(errorMssg);
      }
      return $q.reject(rejection);
    },
  };
}