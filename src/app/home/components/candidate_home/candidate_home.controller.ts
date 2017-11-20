
import { StringUtils } from '../../../common/services/stringUtils';


/** @ngInject */
export function CandidateHomeController($scope: any,
                                       toastr: any,
                                       $translate: ng.translate.ITranslateService, 
                                       $timeout : ng.ITimeoutService,
                                       $sessionStorage : any,
                                       $state: ng.ui.IStateService,
                                       $http: any,
                                       StringUtils: StringUtils,
                                       NgTableParams: any,
                                       homeService: any,
                                       offertService: any,
                                       $q: any) {

    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;
    vm.user = $sessionStorage.JWTtoken.id;
    vm.columns = [{title:'Postulación', field: 'id'}, {title:'Nombre de la postulación', field: 'postulationName'}, {title:'Fecha de creación', field: 'creationDate'} , {title:'Estado de la postulación', field: 'state'}, {title:'Nombre del paso', field: 'currentStepName'}, {title:'Detalle', field: 'detail', action: true}];
    vm.data = [];

    var init = function(){
        homeService.getPostulations(vm.JWTtoken.response, vm.user)
        .then(function(response){
            vm.data = response.data;
            for (var i = 0 ; i < vm.data.length ; i++) {
              vm.data[i].detail = 'Ver detalle';
              var d = new Date(vm.data[i].creationDate);
              vm.data[i].creationDate = StringUtils.formatDate(d);
              vm.data[i].state = StringUtils.parseState(vm.data[i].state);
              vm.data[i].currentStepName = vm.data[i].currentStep.name;
              vm.data[i].postulationName = vm.data[i].offer.name;
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
            vm.table.isFiltersVisible = true;
          },function(reason){
            
          });
    }
    init();

    vm.goToPostulationDetail = function(row,column) {
      let promises = [
        homeService.getPostulation(vm.JWTtoken.response, vm.user, row.id), 
        offertService.getSteps(row.offer.id, vm.JWTtoken.response, vm.user)];
      
      $q.all(promises).then((values) => {
          $state.go('layout.currentstep', {'steps' : values[1].data
              , 'postulation': values[0].data[0]
              , 'offerName': row.offer.name})
      });
    }

}