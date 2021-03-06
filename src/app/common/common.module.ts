import { RootComponent } from './components/root/root.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RecoveryComponent } from './components/password_recovery/recovery.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopPanelComponent } from './components/top_panel/top_panel.component';
import { ExportPdfComponent } from './components/export_pdf/export_pdf.component';
import { RegexPasswordService }  from './services/regex_password';
import { ShowMessagesService }  from './services/show_messages.service';
import { CreateTableFromJSONService }  from './services/json_to_table.service';
import { DecodePlaceholderFilter }  from './filters/decode_placeholder.filter';
import { SessionService } from './components/security/session.service';
import { CookieConstants } from 'common/environment/cookieConstants'
import { Api }  from './services/api.service';
import { StringUtils }  from './services/stringUtils';

let cookieConstants : CookieConstants = {
    currentState: 'currentState'
  };

export default angular.module('app.common', [])
  .component('appRoot', RootComponent)
  .component('headerSube', HeaderComponent)
  .component('footerSube', FooterComponent)
  .component('topPanel',TopPanelComponent)
  .component('exportPdf',ExportPdfComponent)
  .component('notification',NotificationComponent)
  .component('recovery', RecoveryComponent)
  .constant('cookieConstants',cookieConstants)
  .service('sessionService',SessionService)
  .service('regexPasswordService',RegexPasswordService)
  .service('showMessagesService',ShowMessagesService)
  .service('createTableFromJSONService',CreateTableFromJSONService)
  .service('Api',Api)
  .service('StringUtils',StringUtils)
  .filter('decodePlaceholderFilter', DecodePlaceholderFilter);
