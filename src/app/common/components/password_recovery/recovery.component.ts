import { RecoveryController } from './recovery.controller';

export const RecoveryComponent: angular.IComponentOptions = {
    templateUrl: 'app/common/components/password_recovery/recovery.html',
    controller: RecoveryController,
    controllerAs: 'vm',
    bindings: {
        isOpen: '='
    }
};
