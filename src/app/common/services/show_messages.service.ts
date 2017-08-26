
export class ShowMessagesService {
  /** @ngInject */
  constructor() {
  }  
  
  showInfo(message: string): void
  { 
    let xButton: string = '';//'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

    this.fadeOutAll();

    $('#infoBox').html(xButton + '<p align=center>' + message + '</p>');
    $('#infoBox').fadeIn('slow').delay(5000).fadeOut('slow');
  }

  showAlert(message: string): void
  {
    this.fadeOutAll();

    let xButton: string = '';//'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    $('#alertBox').html(xButton + '<p align=center>' + message + '</p>');
    $('#alertBox').fadeIn('slow').delay(5000).fadeOut('slow');
  }

  fadeOutAll(): void
  {
    $('#infoBox').finish();
    $('#infoBox').fadeOut(0);
    $('#alertBox').finish();
    $('#alertBox').fadeOut(0);
  }

}
