import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { StringUtils } from '../../../common/services/stringUtils';
import { PostulationService } from '../../services/postulation.service';


/** @ngInject */
export function CurrentStepController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService,
    $timeout: ng.ITimeoutService,
    $sessionStorage: any,
    $state: ng.ui.IStateService,
    $http: any,
    NgTableParams: any,
    homeService: any,
    postulationService: PostulationService) {

    var vm = this;

    vm.currentStep = {};
    vm.filledStep = [];
    vm.steps = $state.params['steps'];
    vm.postulation = $state.params['postulation'];
    vm.offerName = $state.params['offerName'];
    vm.isOfferor = $state.params['isOfferor'];
    vm.userId = $sessionStorage.JWTtoken.id;
    vm.token = $sessionStorage.JWTtoken.response;

    var getAttributeValue = function(listAttr) {
        return listAttr.attribute.type == 6 ? listAttr.stringValue :
        listAttr.attribute.type == 4 ? listAttr.intValue :
        listAttr.attribute.type == 3 ? listAttr.dateValue : '';
    }

    var init = function(){
        vm.steps.forEach(element => {
            if (element.id == vm.postulation.currentStep.id) vm.currentStep = element;
        });
        vm.currentStep.offerStepConfiguration.serializeSettings = 
            JSON.parse(vm.currentStep.offerStepConfiguration.serializeSettings);
        if (vm.postulation != null && vm.postulation.postulationInfoList != null) {
            vm.currentStep.offerStepConfiguration.serializeSettings.forEach(elementS => {
                vm.postulation.postulationInfoList.forEach(elementP => {
                    if (elementS.name === elementP.attribute.name){
                        console.log(elementP);
                        elementS.id = elementP.id;
                        console.log(elementS);
                        elementS.filledValue = getAttributeValue(elementP);
                    }
                });
            });
        }
    }
    init();

    vm.closePostulation = function() {
        vm.postulation.state = 0;
        postulationService.postulation(vm.postulation.offer.id, vm.token, vm.userId, vm.postulation)
        .then(function(response){
            vm.notificationMessage = "La postulación ha sido cerrada correctamente"; 
            vm.openNotification = true; 
            vm.notificationTitle = "Postulación cerrada"; 
            vm.notificationType = "success";
        },function(){
            vm.notificationMessage = "La postulación no se pudo cerrar"; 
            vm.openNotification = true; 
            vm.notificationTitle = "Postulación no cerrada"; 
            vm.notificationType = "error";
        });
    }

    vm.goToCandidateHome = function() {
        console.log(vm.currentStep);
        $state.go("layout.candidateHome");
    }

    vm.sendStep = function() {
        vm.currentStep.offerStepConfiguration.serializeSettings.forEach(element => {
            vm.filledStep.push(
                {
                    'attribute' : {
                        'name' : element.name,
                        'type' : element.type
                    },
                    'postulationId': vm.postulation.id,
                    'boolValue': 1,
                    'dateValue': element.type == 3 ? element.filledValue : null,
                    'decimalValue': null,
                    'id':element.id,
                    'intValue': element.type == 4 ? element.filledValue : null,
                    'stringValue': element.type == 6 ? element.filledValue : null,
                });
        });

        if(vm.currentStep.type == 0) vm.postulation.postulationInfoList = [];
        else vm.postulation.postulationInfoList = vm.filledStep;
        postulationService.postulation(vm.postulation.offer.id, vm.token, vm.userId, vm.postulation)
            .then(function(response){
                vm.notificationMessage = "La información fue registrada exitosamente"; 
                vm.openNotification = true; 
                vm.notificationTitle = "Registro exitoso"; 
                vm.notificationType = "success";
                if (response.data.currentStep.id == vm.postulation.currentStep.id) {
                    response.data.state = 2;
                    postulationService.postulation(vm.postulation.offer.id, vm.token, vm.userId, response.data);
                }
            },function(){
                vm.notificationMessage = "El registro de la información a fallado, por favor revise el formulario"; 
                vm.openNotification = true; 
                vm.notificationTitle = "Registro fallido"; 
                vm.notificationType = "error";
            });
    }
}