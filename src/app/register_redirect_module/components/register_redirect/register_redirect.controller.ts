import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { StringUtils } from '../../../common/services/stringUtils';

  
  /** @ngInject */
export function RegisterRedirectController($scope: any,
                                            toastr: any,
                                            $translate: ng.translate.ITranslateService, 
                                            $timeout : ng.ITimeoutService,
                                            $state : ng.ui.IStateService,
                                            $window : any,
                                            StringUtils:StringUtils) {

    var vm = this;

    vm.goToOfferent = function(){
        $state.go("layout.registerOfferent");
    };

    vm.goToCandidate = function(){
        $state.go("layout.registerCandidate");
    };

}
