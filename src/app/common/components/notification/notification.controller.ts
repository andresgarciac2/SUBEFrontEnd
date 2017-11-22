  
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
        if (vm.redirect !== undefined && vm.type === 'success'){
            if(vm.params !== undefined)$state.go(vm.redirect, vm.params);
            else $state.go(vm.redirect);
        }
    }
}
    