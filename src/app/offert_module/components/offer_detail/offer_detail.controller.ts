import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { OffertService } from '../../services/offert.service';
import { StringUtils } from '../../../common/services/stringUtils';

  
  /** @ngInject */
export function OfferDetailController($scope: any,
                                            toastr: any,
                                            $translate: ng.translate.ITranslateService, 
                                            $timeout : ng.ITimeoutService,
                                            $state : ng.ui.IStateService,
                                            $window : any,
                                            $sessionStorage : any,
                                            offertService : OffertService,
                                            StringUtils:StringUtils) {

    var vm = this;
                   
    vm.offer = $state.params['offer'];
    console.log(vm.offer);

    vm.createStep = function() {
        $state.go('layout.step',{'offer_id':vm.offer.id, 'offer_name':vm.offer.name});
    }
}
