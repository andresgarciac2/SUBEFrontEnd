import { Api } from '../../common/services/api.service';
import { LoginDTO } from 'login_module/dto/loginDTO';   

export class LoginService {

    private loginDto: LoginDTO;

    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
        //this.agregarPersonaObservable = new this.rx.Subject();
    }

    public setLogin(login: LoginDTO) {
        this.loginDto = login;

        //Se pasa el correo a minuscula
        //this.loginDto.email = login.email.toLowerCase();
    } 

    public login(user: number, pass:string )
    {
        var loginDTO: LoginDTO = {
            user: user,
            password: pass
        }
        this.setLogin(loginDTO);

        return this.$http.post('http://localhost:8481/login', loginDTO);//*this.Api.post('http://localhost:8480/login', this.loginDto, true);*/
    }

    public logout() {
        return this.Api.delete('/sessions', true);
    }
}