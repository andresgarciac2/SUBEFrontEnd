export class StringUtils {

  /**
   * Decodes unicode characters
   * @param text Text to replace
   * @returns {string} Text with replaced unicode characters
   */
  public unicodeToChar = (text: string): string => {
    return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
  };


  public formatDate = function(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  public parseOfferorState = function(state) {
    if(state == 1) return 'Activo'
    if(state == 0) return 'Inactivo'
  }

  public parseOfferState = function(state) {
    if(state == 1) return 'Abierta'
    if(state == 0) return 'Cerrada'
  }

  public parseOfferStateInverse = function(state) {
    if(state == 'Abierta') return 1
    if(state == 'Cerrada') return 0
  }

  public parseState = function(state) {
    if(state == 1) return 'Activa'
    if(state == 2) return 'Aprobada'
    if(state == 0) return 'Rechazada'
  }

  /**
   * Unescapes all object properties
   * @param object Object to unescape
   * @param fields Fields name to unescape
   * @returns {any} Unescaped object
   */
  public unescapeObject = (object: any, fields: string[]): any => {
    for (var property in object) {
      if (object.hasOwnProperty(property) && angular.isDefined(object[property])) {
        var propertyValue: any = object[property];
        if (Array.isArray(propertyValue)) {
          // property value is an array of objects
          propertyValue = propertyValue.map(propertyObj => {
            return this.unescapeObject(propertyObj, fields);
          });
        } else if (typeof propertyValue === 'object') {
          // property value is an object
          propertyValue = this.unescapeObject(propertyValue, fields);
        } else if (typeof propertyValue === 'string') {
          // property value is an string
          if (angular.isDefined(fields) && fields.indexOf(property) !== -1) {
            object[property] = this.unicodeToChar(object[property]);
          } else if (angular.isUndefined(fields)) {
            object[property] = this.unicodeToChar(object[property]);
          }
        }
      }
    }
    return object;
  };

  /**
   * Unescapes a json response data.
   * @param response Response to unescape
   * @param fields [OPTIONAL] - Fields name to unescape. If undefined, all response data fields will be unescaped.
   * @returns {any} Unescaped response
   */
  public unescapeJsonResponse = (response: any, fields?: string[]): any => {
    if (angular.isDefined(response.data)) {
      var responseData = angular.copy(response.data);
      if (Array.isArray(responseData)) {
        response.data = responseData.map((dataObject: any) => {
          return this.unescapeObject(dataObject, fields);
        });
      } else if (typeof responseData === 'object') {
        response.data = this.unescapeObject(responseData, fields);
      }
      return response;
    } else {
      return response;
    }
  }
}
