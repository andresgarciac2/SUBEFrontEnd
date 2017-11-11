/** @ngInject */
export function CandidateHomeController($scope: any,
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
    vm.columns = [{title:'Nombre', field: 'name'}, {title:'Descripción', field: 'description'}, {title:'Fecha de creación', field: 'creationDate'}, {title:'Fecha de inicio', field: 'startDate'}, {title:'Detalle', field: 'detail', action: true}];
    vm.data = [];

}


