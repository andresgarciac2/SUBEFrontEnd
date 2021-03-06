/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $stateProvider
        .state('layout.postulation', {
            url: 'postulation',
            template: '<postulation></postulation>',
            params: {
                'offer': {}
            }
        })
        .state('layout.currentstep', {
            url: 'currentstep',
            template: '<currentstep></currentstep>',
            params: {
                'steps': [],
                'postulation': {},
                'offerName': '',
                'isOfferor': false
            }
        });
}