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
                                            
    vm.offert = {};

    vm.register = function(){
        vm.offert.createdBy = $sessionStorage.JWTtoken.id;
        vm.offert.state = 1;

        offertService.registerOffert(vm.offert,
            $sessionStorage.JWTtoken.response,
            $sessionStorage.JWTtoken.id);
    }
}
