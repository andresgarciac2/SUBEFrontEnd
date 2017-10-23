import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { OffertService } from '../../services/offert.service';
import { StringUtils } from '../../../common/services/stringUtils';

  
  /** @ngInject */
export function StepController($scope: any,
                                            toastr: any,
                                            $translate: ng.translate.ITranslateService, 
                                            $timeout : ng.ITimeoutService,
                                            $state : ng.ui.IStateService,
                                            $window : any,
                                            $sessionStorage : any,
                                            offertService : OffertService,
                                            StringUtils:StringUtils) {

    var vm = this;
    vm.step = {}      
    vm.step.offerStepConfiguration = {};                             
    vm.step.offerStepConfiguration.serializeSettings = [{}];
    vm.step.offerStepConfiguration.offerId = $state.params['offer_id'];
    vm.step.offerId = $state.params['offer_id'];
    vm.step.offerTransition = null;
    
    vm.openNotification = false;
    vm.notificationMessage = "";
    vm.notificationTitle = "";
    vm.notificationType = "";
    vm.offerName = $state.params['offer_name'];

    vm.addAttribute = function(attribute){
        vm.step.offerStepConfiguration.serializeSettings.push({});
    }

    vm.deleteAttribute = function(index){
        vm.step.offerStepConfiguration.serializeSettings.splice(index, 1);
    }

    vm.registerStep = function(){
        offertService.registerStep(vm.step
            , $sessionStorage.JWTtoken.response
            , $sessionStorage.JWTtoken.id)
            .then(function(response){
                vm.step.offerStepConfiguration.serializeSettings = JSON.parse(vm.step.offerStepConfiguration.serializeSettings);
                vm.notificationMessage = 'Paso registrado exitosamente';
                vm.openNotification = true;
                vm.notificationTitle = "Registro de paso exitoso";
                vm.notificationType = "success";
            }, function(){
                vm.step.offerStepConfiguration.serializeSettings = JSON.parse(vm.step.offerStepConfiguration.serializeSettings);
                vm.notificationMessage = 'Tenemos problemas para registrar el paso, intentelo mas tarde';
                vm.openNotification = true;
                vm.notificationTitle = "Registro de paso fallido";
                vm.notificationType = "error";
            })
    }          

}
