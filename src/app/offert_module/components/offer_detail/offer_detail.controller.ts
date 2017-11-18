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
                                            StringUtils:StringUtils,
                                            $q : any) {

    var vm = this;
                   
    vm.offer = $state.params['offer'];
    vm.userId = $sessionStorage.JWTtoken.id;
    vm.token = $sessionStorage.JWTtoken.response;
    vm.isOfferor = $sessionStorage.JWTtoken.role == 1 ? true : false;

    vm.createStep = function() {
        $state.go('layout.step',{'offer_id':vm.offer.id, 'offer_name':vm.offer.name});
    }

    vm.postulate = function() {
        var postulation = {
            "userId": vm.userId,
            "offerId": vm.offer.id,
            "creationDate" : "2017-11-13T00:00:00",
            "state" : 1
        }
        let promises = [
            offertService.postulation(vm.offer.id, vm.token, vm.userId, postulation), 
            offertService.getSteps(vm.offer.id, vm.token, vm.userId)];
        
        $q.all(promises).then((values) => {
            $state.go('layout.currentstep', {'steps' : values[1].data
                , 'postulation': values[0].data
                , 'offerName': vm.offer.name})
        });
    }

    vm.goToOfferPostulations = function(){
        $state.go('layout.postulation', {'offer': vm.offer});
    }
}
