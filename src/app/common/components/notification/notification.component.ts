import {NotificationController} from './notification.controller';

export const NotificationComponent: angular.IComponentOptions = {
    templateUrl: 'app/common/components/notification/notification.html',
    controller: NotificationController,
    controllerAs: 'vm',
    bindings: {
        message: '=',
        isOpen: '=',
        type: '='
    }
  };
  