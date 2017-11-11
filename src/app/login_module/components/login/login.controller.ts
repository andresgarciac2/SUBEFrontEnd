import { LoginDTO } from "../../dto/loginDTO";
import { LoginService } from '../../services/login.service';
import { ShowMessagesService } from '../../../common/services/show_messages.service';

export default class LoginController implements ng.IComponentController {

  public user: number = 0;
  public password: string = "";
  public currentRole: any = null;
  public roleList: string[] = [];
  public terms: boolean = false;

  public validInfo: boolean = true;
  public showRoleComboBox = false;

  public submitPromise: any = false;
  public error: string = "";
  public serviceFail: boolean = false;
  
  /** @ngInject */
  constructor(private toastr: any, 
              private $translate : any,
              private $sanitize : any,
              private $timeout : ng.ITimeoutService,
              private $state : ng.ui.IStateService,
              private $scope : any,
              private $sessionStorage : any,
              private $q : ng.IQService,
              private loginService : LoginService,
              private showMessagesService : ShowMessagesService,
              private $stateParams: any,
              private filterFilter:ng.IFilterFilter, 
              private jwtHelper:any) {
                
  }

  $onInit(){
    this.error = this.$stateParams.e;
    if(this.error == 'unauthorized'){
      let errorMssg: string = "Tu sesión ya no es válida por favor ingresa nuevamente";
      this.showMessagesService.showAlert(errorMssg);
    }
  }

  submit(): void
  {
      var standardDelay = 1000;
      var defer = this.$q.defer();
      var that = this;

      this.$timeout(function () {
          that.loginService.login(that.user, that.password).then(
            function(response,status,headers,config){
              console.log(that.jwtHelper.decodeToken(response.data));
              //console.log(headers('Access-Control-Allow-Credentials'));
              that.$sessionStorage.JWTtoken = {
                                                response: response.data,
                                                id: that.user,
                                                role: that.jwtHelper.decodeToken(response.data).aud
                                              };

              if (that.jwtHelper.decodeToken(response.data).aud === '1') 
                that.$state.go('layout.offerentHome'); 
              else
                that.$state.go('layout.candidateHome'); 
            },function(){
              that.serviceFail = true;
            });
        }, standardDelay);  
        this.submitPromise = defer.promise;
    }

    determinateRoles( roles: string[] ): any
    {        
        var filteredRoles = this.filterFilter(roles,"administrador").concat(this.filterFilter(roles,"intermediario"));
        filteredRoles.forEach(function(part, index, theArray) {
          let min: string = part.split(':')[1].split('.')[0].slice(1);
          theArray[index] = part.split(':')[1].split('.')[0].charAt(0).toUpperCase() + min;
          theArray[index] = theArray[index].replace('Administrador-entidad-principal', 'Superadministrador'); //Si es posible cambiar
        });

        filteredRoles = filteredRoles.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        return filteredRoles;
    }    


    goToRegisterRedirect() : void {
      this.$state.go('layout.registerRedirect');
    };
    
    validateHome():void  //angular.IPromise<boolean>
    {
        this.showMessagesService.fadeOutAll();
        if( this.showRoleComboBox == true )
        {
          if( this.$scope.roleForm.$valid == false )
          {
            return;
          }
        }
        this.$sessionStorage.JWTtoken.currentRole = this.currentRole;
        this.$state.go('layout.offerentHome');  
    }

    resetPassword():void
    {
        this.showMessagesService.fadeOutAll();        
        this.$state.go('layout.emailRequest'); 
    }

    register():void
    {       
        this.$state.go('layout.registerRedirect'); 
    }

}
