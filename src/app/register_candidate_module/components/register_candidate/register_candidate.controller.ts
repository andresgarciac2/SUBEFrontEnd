
import { UserDTO } from "../../dto/userDTO";
import { RegisterCandidateService } from '../../services/register_candidate.service';
import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { UpdateUserDTO } from "../../dto/updateUserDTO";


export default class RegisterCandidateController implements ng.IComponentController {

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
  public aspirante: any = {};
  
  public openNotification = false;
  public notificationMessage = "";
  public notificationTitle = "";
  public notificationType = "";
  public isEdit = false;
  public differentPasswords = false;
  
  /** @ngInject */
  constructor(private toastr: any, 
              private $translate: ng.translate.ITranslateService,
              private $timeout : ng.ITimeoutService,
              private $scope : any,
              private $state : ng.ui.IStateService,
              private registerCandidateService : RegisterCandidateService,
              private $sessionStorage : any,
              private $q : ng.IQService,
              private regexPasswordService : RegexPasswordService,
              private showMessagesService : ShowMessagesService) {

                


    var vm = this;

  } 

  $onInit() {
    console.log(this.$state.params['user']);
    if (this.$state.params['user'] != undefined) {
      var that = this;
      this.isEdit = true;

      this.registerCandidateService.getUser(this.$state.params['user']).then(
        function(response){
          that.aspirante.direccion = response.data.address;
          that.aspirante.telefono = response.data.phone;
          that.aspirante.numeroDocumento = response.data.dni;
          that.aspirante.tipoDocumento = response.data.dniType;
          that.aspirante.pais = response.data.country;
          that.aspirante.email = response.data.email;
          that.aspirante.nombres = response.data.firstName;
        },function(reason){

        }
      );
    }
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
    return this.registerCandidateService.registerEntity(request).then((response: any) => {
      response;
    }, (error: any) => {
      let errorMssg: string = "";
              if(error.data == null) { errorMssg = "Oops!... Algo no salió bien :("; }
              else if(error.data.message == null) { errorMssg = error.data; }
              else { errorMssg = error.data.message; }
      that.showMessagesService.showAlert('Ocurrio un error, por favor intente nuevamente: <i>' + errorMssg + '</i>');
    });;
  }


  editUser(): void
  {
    var userDto: UpdateUserDTO = {
      dni: this.aspirante.numeroDocumento,
      dniType: this.aspirante.tipoDocumento,
      country: this.aspirante.pais,
      email: this.aspirante.email,
      firstName: this.aspirante.nombres,
      lastName: this.aspirante.apellidos !== undefined ? this.aspirante.apellidos:".",
      address: this.aspirante.direccion,
      phone: this.aspirante.telefono,
      password: this.aspirante.contrasena,
      newPassword: this.aspirante.nuevaContrasena,
      roleId: this.rolSeleccionado === 'aspirante' ? 1 : 2
    };      

    var that = this;
    var standardDelay = 1000;
    var defer = this.$q.defer();
    if (this.aspirante.nuevaContrasenaConf === this.aspirante.nuevaContrasena) {
      this.$timeout(function () {
        that.registerCandidateService.updateUser(userDto).then(
          (response: any) => {
            //that.$state.go('layout.login'); 
            that.notificationMessage = 'Usuario actualizado exitosamente';
            that.openNotification = true;
            that.notificationTitle = "Actualización exitosa";
            that.notificationType = "success";
            that.showMessagesService.showInfo('Usuario registrado exitosamente!');
          }, (error) => {
            that.notificationMessage = 'Upss tenemos problemas';
            that.openNotification = true;
            that.notificationTitle = "Actualización fallida";
            that.notificationType = "error";
          });
      }, standardDelay);
    } else {
      this.differentPasswords = true;
    }
  }

  registerUser(): void
  {console.log(this.aspirante.numeroDocumento);
      var userDto: UserDTO = {
        dni: this.aspirante.numeroDocumento,
        dniType: this.aspirante.tipoDocumento,
        country: this.aspirante.pais,
        email: this.aspirante.email,
        firstName: this.aspirante.nombres,
        lastName: this.aspirante.apellidos !== undefined ? this.aspirante.apellidos:".",
        address: this.aspirante.direccion,
        phone: this.aspirante.telefono,
        password: this.aspirante.contrasena,
        roleId: this.rolSeleccionado === 'aspirante' ? 1 : 2
      };      

      var that = this;
      var standardDelay = 1000;
      var defer = this.$q.defer();

      this.$timeout(function () {
          that.registerCandidateService.registerUser(userDto).then(
            (response: any) => {
              //that.$state.go('layout.login'); 
              that.notificationMessage = 'Usuario registrado exitosamente';
              that.openNotification = true;
              that.notificationTitle = "Registro exitoso";
              that.notificationType = "success";
              that.showMessagesService.showInfo('Usuario registrado exitosamente!');
            }, (error) => {
              that.notificationMessage = 'Upss tenemos problemas';
              that.openNotification = true;
              that.notificationTitle = "Registro fallido";
              that.notificationType = "error";
            });
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
          this.registerCandidateService.getEntity(JSON.parse(this['selectedCompany']).brokerId).then(
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
    this.registerCandidateService.changeStatus(this.usuario).then((response: any) => {
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
