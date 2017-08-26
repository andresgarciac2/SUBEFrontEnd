/** @ngInject */
export default function forms(ngFabFormProvider: any) {
  ngFabFormProvider.extendConfig({
    validationsTemplate: 'app/common/components/validations/validations.html',
    preventInvalidSubmit: true,
    preventDoubleSubmit: true,
    preventDoubleSubmitTimeoutLength: 1000,
    setFormDirtyOnSubmit: true,
    scrollToAndFocusFirstErrorOnSubmit: true,
    scrollAnimationTime: 500,
    scrollOffset: -100,

    disabledForms: true,
    globalFabFormDisable: true,
    setNovalidate: true,
    setNamesByNgModel: true,
    setAsteriskForRequiredLabel: false,
    asteriskStr: '*',
    validationMsgPrefix: 'validationMsg',
    //emailRegex: /^\b[A-ZÀ-úÑñ0-9._-\s]+@[A-ZÀ-úÑñ0-9.-\s]+(\.[A-ZÀ-úÑñ0-9._-\s]+)?\b$/i,
    emailRegex: /^\b[A-ZÀ-úÑñ0-9._-\s]+@[A-ZÀ-úÑñ0-9.-\s]+(\.[A-ZÀ-úÑñ0-9._-\s]+)?\b$/i,
    watchForFormCtrl: false,
    formChangeEvent: 'NG_FAB_FORM_OPTIONS_CHANGED',
    createMessageElTplFn: function (sanitizedKey: any, attr: any) {
      return '<li ng-message="' + sanitizedKey + '">' + attr + '</li>';
    }
  });
}
