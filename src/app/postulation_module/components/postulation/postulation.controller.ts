import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { StringUtils } from '../../../common/services/stringUtils';
import { PostulationService } from '../../services/postulation.service';


/** @ngInject */
export function PostulationtController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService,
    $timeout: ng.ITimeoutService,
    $state: ng.ui.IStateService,
    $window: any,
    $sessionStorage: any,
    StringUtils: StringUtils,
    NgTableParams: any,
    postulationService: PostulationService,
    homeService : any,
    offertService: any,
    $q: any) {

    var vm = this;

    vm.offer = $state.params['offer'];
    vm.userId = $sessionStorage.JWTtoken.id;
    vm.token = $sessionStorage.JWTtoken.response;
    vm.columns = [{title:'Aspirante', field: 'userName'}, {title:'Documento', field: 'userId'}, {title:'Fecha de postulación', field: 'creationDate'}, {title:'Estado de la ofeta', field: 'state'}, {title:'Paso', field: 'currentStepName'}, {title:'Estado del paso', field: 'stepState'}, {title:'Detalle', field: 'detail', action: true}];
    vm.data = [];

    var init = function() {
        postulationService.getPostulations(vm.offer.id, vm.token, vm.userId)
        .then(function(response){
            vm.data = response.data;
            for (var i = 0 ; i < vm.data.length ; i++) {
              vm.data[i].detail = 'Ver detalle';
              vm.data[i].userId = vm.data[i].user.dni;
              vm.data[i].userName = vm.data[i].user.firstName;
              vm.data[i].currentStepName = vm.data[i].currentStep.name;
              var d = new Date(vm.data[i].creationDate);
              vm.data[i].creationDate = StringUtils.formatDate(d);
              vm.data[i].state = StringUtils.parseState(vm.data[i].state);
            }
            
            vm.table = new NgTableParams({
              sorting: { name: "asc" },
              filter: {} 
            }, {         
              counts: [],
              paginationMaxBlocks: 13,
              paginationMinBlocks: 2,
              dataset: vm.data
            });
        }, function(){
            
        });
    }
    init();

    vm.goToPostulationDetail = function(row,column) {

      let promises = [
        homeService.getPostulation(vm.token, vm.userId, row.id), 
        offertService.getSteps(row.offer.id, vm.token, vm.userId)];
      
      $q.all(promises).then((values) => {
          $state.go('layout.currentstep', {'steps' : values[1].data
              , 'postulation': values[0].data[0]
              , 'offerName': row.offer.name
              , 'isOfferor': true})
      });
    }

}