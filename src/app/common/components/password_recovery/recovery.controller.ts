import { Api } from '../../services/api.service';

/** @ngInject */
export function RecoveryController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService,
    $timeout: ng.ITimeoutService,
    $state: ng.ui.IStateService,
    $window: any,
    $sessionStorage: any,
    Api: Api) {

    var vm = this;
    vm.showSuccesMsj = false;

    vm.recovery = function(){
        Api.post('http://localhost:8480/recoverPassword',{'dni':vm.dni, 'email':vm.email})
            .then(function(response){
                vm.showSuccesMsj = true;
            },function(){});
    }
}
