/** @ngInject */
export default function routes($stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {
$stateProvider
.state('layout.registerRedirect', {
url: 'registerredirect',
template: '<register_redirect></register_redirect>'
});
}
