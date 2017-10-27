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
     
    vm.initStep  = function() {
        vm.step = {} 
        vm.step.offerStepConfiguration = {};                             
        vm.step.offerStepConfiguration.serializeSettings = [{}];
        vm.step.offerStepConfiguration.offerId = $state.params['offer_id'];
        vm.step.offerId = $state.params['offer_id'];
        vm.step.offerTransition = null;
        vm.register = true;
    }
    vm.initStep();
    
    vm.openNotification = false;
    vm.notificationMessage = "";
    vm.notificationTitle = "";
    vm.notificationType = "";
    vm.offerName = $state.params['offer_name'];

    var init = function(){
        offertService.getSteps(vm.step.offerId
            , $sessionStorage.JWTtoken.response
            , $sessionStorage.JWTtoken.id)
        .then(function(response){
            vm.defindedSteps = response.data;
        },
        function(){

        });
    }

    init();

    vm.addAttribute = function(attribute){
        vm.step.offerStepConfiguration.serializeSettings.push({});
    }

    vm.deleteAttribute = function(index){
        vm.step.offerStepConfiguration.serializeSettings.splice(index, 1);
    }

    vm.editStep = function(){
        if (vm.selectedStep !== undefined) {
            vm.register = false;
            vm.step = vm.selectedStep;
            vm.step.offerStepConfiguration.serializeSettings = JSON.parse(vm.step.offerStepConfiguration.serializeSettings);
        }
            
    }

    vm.updateStep = function() {
        offertService.updateStep(vm.step
            , $sessionStorage.JWTtoken.response
            , $sessionStorage.JWTtoken.id)
            .then(function(response){
                vm.step.offerStepConfiguration.serializeSettings = JSON.parse(vm.step.offerStepConfiguration.serializeSettings);
                vm.notificationMessage = 'Paso actualizado exitosamente';
                vm.openNotification = true;
                vm.notificationTitle = "Actualización de paso exitoso";
                vm.notificationType = "success";
            }, function(){
                vm.step.offerStepConfiguration.serializeSettings = JSON.parse(vm.step.offerStepConfiguration.serializeSettings);
                vm.notificationMessage = 'Tenemos problemas para actualizar el paso, intentelo mas tarde';
                vm.openNotification = true;
                vm.notificationTitle = "Actualización de paso fallido";
                vm.notificationType = "error";
            });
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
