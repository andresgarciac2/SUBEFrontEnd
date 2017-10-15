  
  /** @ngInject */
  export function NotificationController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService, 
    $timeout : ng.ITimeoutService,
    $state : ng.ui.IStateService,
    $window : any,
    $sessionStorage : any) {

    var vm = this;
    
    vm.closeModal = function() {
        vm.isOpen = false;
    }
}
    