import { Api } from '../../common/services/api.service';

export class HomeService {;

    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
        //this.agregarPersonaObservable = new this.rx.Subject();
    }

    public updateOffer(id: any, token: string, offer: any)
    {
        var req = {
            method: 'PUT',
            url: 'http://localhost:8082/academicOffer',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            },
            data: offer
           }
           
           return this.$http(req);/*.then(function(){...}, function(){...});*/
    }

    public updateOfferor( offeror: any)
    {
        var req = {
            method: 'POST',
            url: 'http://localhost:8480/updateOfferor',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded'
            },
            data: offeror
           }
           
           return this.$http(req);/*.then(function(){...}, function(){...});*/
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

    public getOfferors()
    {
        var req = {
            method: 'GET',
            url: 'http://localhost:8480/offerors',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded'
            }
           }
           
           return this.$http(req);
    }

    public getPostulations(token: any, id : any){
        var req = {
            method: 'GET',
            params: {userId: id},
            url: 'http://localhost:8082/postulation',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            }
           }   
           return this.$http(req);
    }

    public getPostulation(token: any, id : any, postulationId: any){
        var req = {
            method: 'GET',
            params: {"id": postulationId},
            url: 'http://localhost:8082/postulation',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            }
           }   
           return this.$http(req);
    }


}