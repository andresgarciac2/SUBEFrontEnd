
import { UserDTO } from "../../dto/userDTO";
import { RegisterOfferentService } from '../../services/register_offerent.service';
import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';

export default class RegisterOfferentController implements ng.IComponentController {

  public username: string = "";  
  public password: string = "";
  public name: string = "";
  public document: number = null;
  public rol: string = "";
  public terms: boolean = false;
  public country: string = "Colombia";
  public profile: string = "";
  public usuario: any;
  public user: any;
  public roles: any;
  public selectedRole: any;
  public validInfo: boolean = false;
  public submitPromise: any = false;
     //Loader Variables
  public progressBarStyle = { 'width': '0%' };
  public showLoader = false;

  public motrarAspirante = false;
  public motrarOferente = false;
  public rolSeleccionado = "";
  public oferente: any = {};
  
  /** @ngInject */
  constructor(private toastr: any, 
              private $translate: ng.translate.ITranslateService,
              private $timeout : ng.ITimeoutService,
              private $scope : any,
              private $state : ng.ui.IStateService,
              private registerOfferentService : RegisterOfferentService,
              private $sessionStorage : any,
              private $q : ng.IQService,
              private regexPasswordService : RegexPasswordService,
              private showMessagesService : ShowMessagesService) {

                


    var vm = this;

  } 

  $onInit() {
  }


    seleccionarRol() : void {
        var rol = this.rolSeleccionado;
        switch(rol){
            case 'aspirante':
                this.motrarAspirante = true;
                this.motrarOferente = false;
                break;
            case 'oferente':
                this.motrarAspirante = false;
                this.motrarOferente = true;
                break;
        };
        
    };

  registerEntity(): any
  {
    
      var request: any = {
        nombre : JSON.parse(this['selectedCompany']).nombre,
        nit : JSON.parse(this['selectedCompany']).brokerId,
        digitoVerificacion : 4,
        codigoEntidad : JSON.parse(this['selectedCompany']).brokerId,
        dominioCorreo : [this.username.split('@')[1]],
        nombreContacto : "No Aplica",
        correoContacto : "default@qbe.com",
        telefonoContacto : "0000000",
        direccionEntidad : "N/A",
        departamento : "N/A",
        ciudad : "N/A",
        estado : "activo"
      }; 
      var that = this;
    return this.registerOfferentService.registerEntity(request).then((response: any) => {
      response;
    }, (error: any) => {
      let errorMssg: string = "";
              if(error.data == null) { errorMssg = "Oops!... Algo no salió bien :("; }
              else if(error.data.message == null) { errorMssg = error.data; }
              else { errorMssg = error.data.message; }
      that.showMessagesService.showAlert('Ocurrio un error, por favor intente nuevamente: <i>' + errorMssg + '</i>');
    });;
  }


  registerUser(): void
  {console.log(this.oferente.numeroDocumento);
      var userDto: UserDTO = {
        dni: this.oferente.numeroDocumento,
        dniType: this.oferente.tipoDocumento,
        country: this.oferente.pais,
        email: this.oferente.email,
        firstName: this.oferente.nombres,
        lastName: this.oferente.apellidos !== undefined ? this.oferente.apellidos:".",
        address: this.oferente.direccion,
        phone: this.oferente.telefono,
        password: this.oferente.contrasena,
        roleId: this.rolSeleccionado === 'aspirante' ? 2 : 1
      };      

      var that = this;
      var standardDelay = 1000;
      var defer = this.$q.defer();

      this.$timeout(function () {
          that.registerOfferentService.registerUser(userDto).then(
            (response: any) => {
              that.$state.go('layout.login'); 
              that.showMessagesService.showInfo('Usuario registrado exitosamente!');
            }, (error) => {});
        }, standardDelay);
      this.submitPromise = defer.promise;      
      
    }
  
  submit(): void
  {  
      if( this.$scope.registerForm.$valid == false )
      {
          this.validInfo = false;
          return;
      }
      var that = this;
      this.showLoader = true;
      if(this.$sessionStorage.JWTtoken.currentRole == 'Superadministrador'){
          this.registerOfferentService.getEntity(JSON.parse(this['selectedCompany']).brokerId).then(
            (response: any) => {
                this.registerUser();
            }, (error) => {
              this.registerEntity().then(
                (response: any) => {
                    this.registerUser();
                }, (error) => {
                  that.updateProgressBar();
                  let errorMssg: string = "";
                  if(error.data == null) { errorMssg = "Oops!... Algo no salió bien :("; }
                  else if(error.data.message == null) { errorMssg = error.data; }
                  else { errorMssg = error.data.message; }
                  that.showMessagesService.showAlert('Ocurrio un error, por favor intente nuevamente: <i>' + errorMssg + '</i>');
                });
            });
      }else{
        this.registerUser();
      }
  }

  editar(): void {
    this.usuario.nombre = this.name
    if(this.selectedRole != undefined){
      this.usuario.rol = this.selectedRole.nombre
    }
    var that = this;
    this.usuario.identificacion = "CC" + this.document;
    this.registerOfferentService.changeStatus(this.usuario).then((response: any) => {
      this.showMessagesService.showInfo('Usuario editado exitosamente!');
      this.$timeout(function () {
        that.$state.reload();
      }, 3000);
    }, (error: any) => {
      let errorMssg: string = "";
              if(error.data == null) { errorMssg = "Oops!... Algo no salió bien :("; }
              else if(error.data.message == null) { errorMssg = error.data; }
              else { errorMssg = error.data.message; }
      that.showMessagesService.showAlert('Ocurrio un error, por favor intente nuevamente: <i>' + errorMssg + '</i>');
    });
  }

  updateProgressBar() : void
  {
    this.progressBarStyle.width = '100%';
    var that = this;
    that.showLoader = false;
  }
}