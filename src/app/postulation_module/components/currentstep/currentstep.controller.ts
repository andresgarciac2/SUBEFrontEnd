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
    vm.userId = $sessionStorage.JWTtoken.id;
    vm.token = $sessionStorage.JWTtoken.response;

    var init = function(){
        vm.steps.forEach(element => {
            if (element.id == vm.postulation.currentStep) vm.currentStep = element;
        });
        vm.currentStep.offerStepConfiguration.serializeSettings = 
            JSON.parse(vm.currentStep.offerStepConfiguration.serializeSettings);
    }
    init();

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
                    'intValue': element.type == 4 ? element.filledValue : null,
                    'stringValue': element.type == 6 ? element.filledValue : null,
                });
        });
        vm.postulation.postulationInfoList = vm.filledStep
        postulationService.postulation(vm.postulation.offerId, vm.token, vm.userId, vm.postulation)
    }
}