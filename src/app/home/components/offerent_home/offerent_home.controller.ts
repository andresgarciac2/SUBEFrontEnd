/** @ngInject */
export function OfferentHomeController($scope: any,
                                       toastr: any,
                                       $translate: ng.translate.ITranslateService, 
                                       $timeout : ng.ITimeoutService,
                                       $sessionStorage : any,
                                       $state: ng.ui.IStateService,
                                       $http: any,
                                       NgTableParams: any,
                                       homeService: any) {

    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;
    vm.user = $sessionStorage.JWTtoken.id;
    vm.role = $sessionStorage.JWTtoken.role;

    vm.columns = [{title:'Nombre', field: 'name'}, {title:'Descripción', field: 'description'}, {title:'Fecha de creación', field: 'creationDate'}, {title:'Fecha de inicio', field: 'startDate'}, {title:'Detalle', field: 'detail', action: true}];
    vm.data = [];

    var init = function(){
      homeService.getOffersByOfferor(vm.user, vm.JWTtoken.response, vm.role == 1 ? vm.user : '')
        .then(function(response){
          vm.data = response.data;
          for (var i = 0 ; i < vm.data.length ; i++) {
            vm.data[i].detail = 'Ver detalle';
          }

          vm.table = new NgTableParams({
            sorting: { name: "asc" } 
          }, {         
            counts: [],
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: vm.data
          });
        },function(reason){
          
        });
    } 

    init();

    vm.goToOfferDetail = function(row,column){
      $state.go('layout.offerDetail', {offer: row})
    }

    vm.changeScreen = function(url: string)
    {
      $state.go('layout.' + url);
    }

    vm.logout = function(){
      delete $sessionStorage.JWTtoken;
      vm.JWTtoken = "";
      $state.go('layout.login'); 
    }


}


