  /** @ngInject */
export function HomeController($scope: any,
                                       toastr: any,
                                       $translate: ng.translate.ITranslateService, 
                                       $timeout : ng.ITimeoutService,
                                       $sessionStorage : any,
                                       $state: ng.ui.IStateService,
                                       $http: any) {

    var vm = this;

    vm.JWTtoken = $sessionStorage.JWTtoken;
    vm.desc = "";
    vm.idPaciente = "";
    vm.consultar = false;
    vm.idCons = "";
    /*
  String descripcion;
  int idDoctor;
  int idPaciente;

    */
    vm.changeScreen = function(url: string)
    {
      $state.go('layout.' + url);
    }

    vm.createDiag = function(){
      var req = {
        method: 'POST',
        url: 'http://localhost:8083/crearDiagnosticoXPaciente',
        headers: {
          'TOKEN': vm.JWTtoken.response,
          'ID': vm.JWTtoken.id
        },
        data: { 'descripcion': vm.desc, 'idDoctor':vm.JWTtoken.id, 'idPaciente':vm.idPaciente }
        };
      $http(req).then(function(){vm.response = "episodio creado"}, function(){vm.response = "error"});
    }

  vm.consultarEpisodios = function(){
      var req = {
        method: 'POST',
        url: 'http://localhost:8083/consultarEpisodiosXPaciente',
        headers: {
          'TOKEN': vm.JWTtoken.response,
          'ID': vm.JWTtoken.id
        },
        data: vm.idCons
        };
      $http(req).then(function(data){vm.diag = data.data}, function(){vm.diag = "error"});
    }

  vm.logout = function(){
    delete $sessionStorage.JWTtoken;
    vm.JWTtoken = "";
    $state.go('layout.login'); 
  }


}


