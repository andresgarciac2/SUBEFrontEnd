export class JqueryUtils {
 
  public CLOSE_ALERT_BTN_ID: string = 'alertCloseBtn';
 
  /** @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }
 
  public exists = (elementId: string): boolean => {
    return angular.element('#' + elementId).length > 0;
  };
 
  public focus = (elementId: string, delay?: number): void => {
    let dl: number = delay || 0;
    if (!this.hasFocus(elementId)) {
      this.$timeout(() => angular.element('#' + elementId).focus(), dl);
    }
  };
 
  public hasFocus = (elementId: string): boolean => {
    return this.exists(elementId) && angular.element('#' + elementId).is(':focus');
  };
 
  public focusedElement = (): JQuery => {
    return angular.element(document.activeElement);
  };
}