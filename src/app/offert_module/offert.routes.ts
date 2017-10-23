/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {
$stateProvider
.state('layout.offert', {
url: 'offer',
template: '<offert></offert>'
})
.state('layout.step', {
url: 'offer/step',
template: '<step></step>',
params: {
    'offer_id': '',
    'offer_name': ''
}
});
}
