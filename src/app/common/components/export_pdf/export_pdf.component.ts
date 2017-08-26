import {ExportPdfController} from './export_pdf.controller';

export const ExportPdfComponent: angular.IComponentOptions = {
  templateUrl: 'app/common/components/export_pdf/export_pdf.html',
  controller: ExportPdfController,
  controllerAs: 'vm',
  bindings: {
    policyNo: '='
  }
};
