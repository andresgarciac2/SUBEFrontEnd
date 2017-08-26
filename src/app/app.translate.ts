import ITranslateProvider = angular.translate.ITranslateProvider;

/** @ngInject */
export default function translate($translateProvider: ITranslateProvider) {

  $translateProvider
    .useSanitizeValueStrategy('sanitize')
    .useStaticFilesLoader({
      prefix: '/locales/',
      suffix: '.json'
    })
    .preferredLanguage('es')
    .fallbackLanguage('es')
    .usePostCompiling(true);
}
