import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { StringUtils } from '../../../common/services/stringUtils';

/** @ngInject */
export function CurrentStepController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService,
    $timeout: ng.ITimeoutService,
    $sessionStorage: any,
    $state: ng.ui.IStateService,
    $http: any,
    NgTableParams: any,
    homeService: any) {

    var vm = this;

    vm.currentStep = {};
    vm.filledStep = [];
    vm.steps = $state.params['steps'];
    vm.postulation = $state.params['postulation'];
    vm.offerName = $state.params['offerName'];

    var init = function(){
        vm.steps.forEach(element => {
            if (element.id == 201) vm.currentStep = element;
        });
        vm.currentStep.offerStepConfiguration.serializeSettings = 
            JSON.parse(vm.currentStep.offerStepConfiguration.serializeSettings);
    }
    init();

    vm.sendStep = function() {
        vm.currentStep.offerStepConfiguration.serializeSettings.forEach(element => {
            vm.filledStep.push(
                {
                    'attributeId': element.name,
                    'postulationId': vm.postulation.id,
                    'boolValue': 1,
                    'dateValue': element.type == 3 ? element.filledValue : null,
                    'decimalValue': null,
                    'intValue': element.type == 4 ? element.filledValue : null,
                    'stringValue': element.type == 6 ? element.filledValue : null,
                });
        });
        console.log(vm.filledStep);
    }
}