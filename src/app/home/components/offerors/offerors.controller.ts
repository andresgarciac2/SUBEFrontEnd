/** @ngInject */
export function OfferorsController($scope: any,
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

    vm.columns = [{title:'Identificación', field: 'id'}, {title:'Compañia', field: 'companyName'}, {title:'Estado', field: 'state'}];
    vm.data = [];

    var init = function(){
      if (vm.role == 3) vm.columns.push({title:'Cambiar estado', field: 'changeState'})
      homeService.getOfferors()
        .then(function(response){
          vm.data = response.data;
          for (var i = 0 ; i < vm.data.length ; i++) {
            if (vm.data[i].state == 1)vm.data[i].isOpen = true;
            else vm.data[i].isOpen = false;
            vm.data[i].state = StringUtils.parseOfferorState(vm.data[i].state);
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
      delete row.isOpen;
      homeService.updateOfferor(row)
        .then(function(response){
          row.isOpen = row.state == 1 ? true : false;
          row.state = StringUtils.parseOfferorState(row.state);
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


