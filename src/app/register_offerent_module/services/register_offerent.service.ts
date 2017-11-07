import { UserDTO } from 'register_offerent_module/dto/userDTO';  
import { UpdateUserDTO } from "register_offerent_module/dto/updateUserDTO";
import { Api } from '../../common/services/api.service'; 

export class RegisterOfferentService {

    public agregarPersonaObservable: any;
    private user: UserDTO;

    /** @ngInject */
    constructor(private rx: any, private $q: angular.IQService,private Api : Api, private $http : any) {
        this.agregarPersonaObservable = new this.rx.Subject();
    }

  /*  public setRegister(user: UserDTO) {
        this.user = user;
        this.user.correoElectronico = user.correoElectronico.toLowerCase();
    }

    public agregarPersona(): angular.IPromise<UserDTO> {
        var deferred = this.$q.defer<UserDTO>();
        if (this.user) {
            this.agregarPersonaObservable.onNext(this.user);
            deferred.resolve(this.user);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }*/

    public registerUser(userDto: UserDTO)
    {
        return this.$http.post('http://localhost:8480/create', userDto);
    }

    public updateUser(userDto: UpdateUserDTO)
    {
        return this.$http.post('http://localhost:8480/update-user', userDto);
    }

    public getUser(userId: any)
    {
        return this.$http.post('http://localhost:8480/get-user', userId);
    }

    public registerEntity(dto: any)
    {
        var request = {
            commandName: "CrearEntidad",
            body: dto
        }
        return this.Api.post('/administracion/commands', request, true);
    }
    public getEntity(id : string)
    {
        return this.Api.get('/administracion/listas/entidades', {cod: id, isCreate: true}, true);
    }
    public changeStatus(usuario : UserDTO)
    {
        return this.Api.post('/administracion/usuarios/update', usuario, true);
    }
}