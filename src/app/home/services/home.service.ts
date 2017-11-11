import { Api } from '../../common/services/api.service';

export class HomeService {;

    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
        //this.agregarPersonaObservable = new this.rx.Subject();
    }

    public getOffersByOfferor(user: any, token: string, createdBy: any)
    {
        var req = {
            method: 'GET',
            url: 'http://localhost:8082/academicOffer',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':user
            }
           }
           if (createdBy !== '') {
               req['params'] = {createdBy: createdBy}
           };
           
           return this.$http(req);
    }


}