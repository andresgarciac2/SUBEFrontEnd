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
    
    vm.addAttribute = function(attribute){
        vm.step.offerStepConfiguration.serializeSettings.push({});
    }

    vm.deleteAttribute = function(index){
        vm.step.offerStepConfiguration.serializeSettings.splice(index, 1);
    }

}
