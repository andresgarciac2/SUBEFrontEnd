import { RegexPasswordService } from '../../../common/services/regex_password';
import { ShowMessagesService } from '../../../common/services/show_messages.service';
import { StringUtils } from '../../../common/services/stringUtils';

/** @ngInject */
export function PostulationtController($scope: any,
    toastr: any,
    $translate: ng.translate.ITranslateService,
    $timeout: ng.ITimeoutService,
    $state: ng.ui.IStateService,
    $window: any,
    $sessionStorage: any,
    StringUtils: StringUtils) {
    var vm = this;
}