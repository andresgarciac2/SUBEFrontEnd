import { Environment } from '../../environment/environment';

export class SessionService {

  // ----------------------------
  // constants
  // ----------------------------

  private tokenCookie: string = 'TOKEN';

  /** @ngInject */
  constructor(private $cookies: ng.cookies.ICookiesService,
    private $sessionStorage: any) {
  }

  /**
   * Función que elimina todas las cookies de autenticación
   */
  public cleanAuthenticationCookies = (): void => {
    this.$cookies.remove(this.tokenCookie);
    this.$sessionStorage.$reset();
  };

  /**
   * Función que retorna el usuario autenticado
   * @returns {AuthenticatedMemberDTO} Una instancia del usuario autenticado (si se encuentra), null de lo contrario
   */
  public getAuthenticatedMember = (): any => {
    if (this.isMemberAuthenticated()) {
      return this.$sessionStorage.JWTtoken;
    } else {
      return null;
    }
  };

  /**
   * Función que construye la url de inicio de sesión del portal
   * @param environment Ambiente de ejecución del portal
   * @param lang Idioma actual
   * @returns {string} La url de inicio de sesión creada
   */
  public getLoginUrl = (environment: Environment): string => {
    let port: string = angular.isDefined(environment.port) ? ':' + environment.port : '';
    return environment.api + port + '/login';
  };

  /**
   * Función que indica si un miembro del portal se encuentra autenticado
   * @returns {boolean} true si el miembro se encuentra autenticado, false de lo contrario
   */
  public isMemberAuthenticated = (): boolean => {
    let token = this.$sessionStorage.JWTtoken;
    return angular.isDefined(token) && token !== null;
  };

  public validState = (state: string): boolean => {
    let token = this.$sessionStorage.JWTtoken;
    var resp: boolean = false;
    var permission;
    var newState = state.replace("layout.", "");
    if (token != undefined) {
      for (permission of token.response.data.permissions) {
        if ((permission.indexOf(newState) > -1)) {
          resp = true;
        }
      }
    }
    return resp;
  };
}