import { Api } from '../../common/services/api.service';

export class HomeService {;

    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
        //this.agregarPersonaObservable = new this.rx.Subject();
    }

    public getOffersByOfferor(user: any, token: string)
    {
        var req = {
            method: 'GET',
            params: {createdBy: user},
            url: 'http://localhost:8086/academicOffer',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':user
            }
           }
           
           return this.$http(req);
    }


}