import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { OffertService } from '../../services/offert.service';
import { StringUtils } from '../../../common/services/stringUtils';

  
  /** @ngInject */
export function OffertController($scope: any,
                                            toastr: any,
                                            $translate: ng.translate.ITranslateService, 
                                            $timeout : ng.ITimeoutService,
                                            $state : ng.ui.IStateService,
                                            $window : any,
                                            $sessionStorage : any,
                                            offertService : OffertService,
                                            StringUtils:StringUtils) {

    var vm = this;
                                            
    vm.offert = {};
    vm.openNotification = false;
    vm.notificationMessage = "";
    vm.notificationTitle = "";
    vm.notificationType = "";

    vm.register = function(){
        vm.offert.createdBy = $sessionStorage.JWTtoken.id;
        vm.offert.state = 1;

        offertService.registerOffert(vm.offert,
            $sessionStorage.JWTtoken.response,
            $sessionStorage.JWTtoken.id)
            
        .then(function(response){
            
            vm.notificationMessage = 'Oferta registrada exitosamente';
            vm.openNotification = true;
            vm.notificationTitle = "Registro de oferta exitoso";
            vm.notificationType = "success";
            $state.go('layout.step',{'offer_id':response.data.id, 'offer_name':vm.offert.name});
        }, function(){
            vm.notificationMessage = 'Tenemos problemas para registrar su oferta, intentelo mas tarde';
            vm.openNotification = true;
            vm.notificationTitle = "Registro de oferta fallido";
            vm.notificationType = "error";
        });
    }
}
