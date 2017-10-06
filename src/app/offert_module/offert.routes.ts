/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {
$stateProvider
.state('layout.offert', {
url: 'offert',
template: '<offert></offert>'
});
}
