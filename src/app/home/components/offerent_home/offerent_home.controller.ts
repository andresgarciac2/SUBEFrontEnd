/** @ngInject */
export function OfferentHomeController($scope: any,
                                       toastr: any,
                                       $translate: ng.translate.ITranslateService, 
                                       $timeout : ng.ITimeoutService,
                                       $sessionStorage : any,
                                       $state: ng.ui.IStateService,
                                       $http: any,
                                       NgTableParams: any,
                                       homeService: any,
                                       StringUtils: any) {

    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;
    vm.user = $sessionStorage.JWTtoken.id;
    vm.role = $sessionStorage.JWTtoken.role;

    vm.columns = [{title:'Nombre', field: 'name'}, {title:'Descripción', field: 'description'}, {title:'Estado', field: 'state'}, {title:'Fecha de creación', field: 'creationDate'}, {title:'Fecha de inicio', field: 'startDate'}, {title:'Detalle', field: 'detail', action: true}];
    vm.data = [];

    var init = function(){
      if (vm.role == 3) vm.columns.push({title:'Cambiar estado', field: 'changeState'})
      homeService.getOffersByOfferor(vm.user, vm.JWTtoken.response, vm.role == 1 ? vm.user : '')
        .then(function(response){
          vm.data = response.data;
          for (var i = 0 ; i < vm.data.length ; i++) {
            vm.data[i].detail = 'Ver detalle';
            if (vm.data[i].state == 1)vm.data[i].isOpen = true;
            else vm.data[i].isOpen = false;
            vm.data[i].state = StringUtils.parseOfferState(vm.data[i].state);
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

    vm.goToOfferDetail = function(row,column){
      $state.go('layout.offerDetail', {offer: row})
    }

    vm.changeOfferStatus = function(row) {
      row.state = row.isOpen ? 1 : 0;
      delete row.detail;
      delete row.isOpen;
      homeService.updateOffer(vm.user, vm.JWTtoken.response,row)
        .then(function(response){
          row.detail = 'Ver detalle';
          row.isOpen = row.state == 1 ? true : false;
          row.state = StringUtils.parseOfferState(row.state);
        },function(){});
      console.log(row);
    }

    vm.goToEditRegister = function(){
      $state.go('layout.registerOfferent', {user: vm.user});
    }

    vm.goToCreateOffer = function(){
      $state.go('layout.offert')      
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


