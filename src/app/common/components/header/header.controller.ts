
export default class HeaderController implements ng.IComponentController {

  public boxMssg: any = {};
  
  /** @ngInject */
  constructor(private toastr: any, 
              private $translate : any,
              private $sanitize : any,
              private $timeout : ng.ITimeoutService,
              private $state : ng.ui.IStateService,
              private $scope : any,
              private $sessionStorage : any,
              private $q : ng.IQService) {
                
  }

  $onInit(){
  }

}
