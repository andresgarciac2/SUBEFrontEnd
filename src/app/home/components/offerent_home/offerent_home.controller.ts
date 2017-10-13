  /** @ngInject */
export function OfferentHomeController($scope: any,
                                       toastr: any,
                                       $translate: ng.translate.ITranslateService, 
                                       $timeout : ng.ITimeoutService,
                                       $sessionStorage : any,
                                       $state: ng.ui.IStateService,
                                       $http: any,
                                       NgTableParams: any) {

    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;
    vm.columns = [{title:'Nombre', field: 'name'}, {title:'Edad', field: 'age'}];
    var data = [{name: "Moroni", age: 50} ,{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50}];

    vm.table = new NgTableParams({
      sorting: { name: "asc" } 
    }, {         
      counts: [],
      paginationMaxBlocks: 13,
      paginationMinBlocks: 2,
      dataset: data});

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


