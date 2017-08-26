
export class RegexPasswordService {
  /** @ngInject */
  constructor() {
  }
  
  regex(): string
  {
    return "(?=^.{8,}$)(?=.*\\W+)(?![.\\n])(?=.*[A-Z]).*$";
  }

}
