
export default class HeaderController implements ng.IComponentController {

  public boxMssg: any = {};
  public title: any = 
      this.$filter('includedByState')('layout.offert') ? 'Crear Oferta' :
      this.$filter('includedByState')('layout.login') ? 'Login' : '';

  /** @ngInject */
  constructor(private toastr: any, 
              private $translate : any,
              private $sanitize : any,
              private $timeout : ng.ITimeoutService,
              private $state : ng.ui.IStateService,
              private $scope : any,
              private $sessionStorage : any,
              private $q : ng.IQService,
              private $filter:any,) {
                
  }

  $onInit(){
  }

  goTo(state: string): void{
   this.$state.go(state);
  }

  logout() : void{
    delete this.$sessionStorage.JWTtoken;
    this.$state.go('layout.login'); 
  }
}
