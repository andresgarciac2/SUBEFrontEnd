  /** @ngInject */
export function TopPanelController($scope: any,
                                       $filter: any,
                                       toastr: any,
                                       $state : ng.ui.IStateService,
                                       $sessionStorage : any, 
                                       $translate: ng.translate.ITranslateService,
                                       $timeout : ng.ITimeoutService) {


    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;

    vm.goToPoliciesList = function() {
        $state.go('layout.policiesList');
    }

    vm.goToBrokersList = function() {
        $state.go('layout.brokersList');
    }

    vm.goToAdministratorsList = function() {
        $state.go('layout.administratorsList');
    }

    vm.goToHome = function() {
        if( vm.JWTtoken != null ) {
            if( vm.JWTtoken.currentRole != null ) {
                $state.go('layout.home');
            }
            else {
                vm.goToLogin();
            }
        } else {
            vm.goToLogin();
        }
    }

    vm.goToProduct = function(product){
        $state.go("layout.products" ,{'product':product});
    }

    vm.goToGeneralInfo = function(info){
        $state.go("layout.generalInfo" ,{'info':info});
    }
    
    vm.goToLogin = function() {
        $sessionStorage.$reset();
        vm.JWTtoken = $sessionStorage;
        $state.go('layout.login');
    }

}