import { Api } from '../../common/services/api.service';

export class PostulationService {


    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
    }

    public postulation(offerId: any, token: any, id : any, postulation: any){
        var req = {
            method: 'PUT',
            url: 'http://localhost:8082/postulation',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            },
            data: postulation
           }   
           return this.$http(req);
    }

    public getPostulations(offerId: any, token: any, id : any){
        var req = {
            method: 'GET',
            params: {offerId: offerId},
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