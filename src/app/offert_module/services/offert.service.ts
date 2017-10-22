import { Api } from '../../common/services/api.service';

export class OffertService {


    /** @ngInject */
    constructor(private rx: any, 
                private $q: angular.IQService,
                private Api : Api,
                private $http: any) {
    }


    public registerOffert(offert: any, token: any, id : any)
    {
        var req = {
            method: 'POST',
            url: 'http://localhost:8086/academicOffer',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            },
            data: offert
           }
           
           return this.$http(req);/*.then(function(){...}, function(){...});*/
    }

    public registerStep(step: any, token: any, id : any)
    {
        step.offerStepConfiguration.serializeSettings = JSON.stringify(step.offerStepConfiguration.serializeSettings);
        console.log(step);
        var req = {
            method: 'POST',
            url: 'http://localhost:8086/offerStep',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'TOKEN':token,
              'ID':id
            },
            data: step
           }
           
           return this.$http(req);/*.then(function(){...}, function(){...});*/
    }

    public logout() {
        return this.Api.delete('/sessions', true);
    }
}