import { TopPanelController } from './top_panel.controller';

export const TopPanelComponent: angular.IComponentOptions = {
  templateUrl: 'app/common/components/top_panel/top_panel.html',
  controller: TopPanelController,
  controllerAs: 'vm',
  bindings: {
    sectionTitle: '='
  }
};
