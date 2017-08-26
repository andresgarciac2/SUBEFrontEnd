
/** @ngInject */
export function DecodePlaceholderFilter()
{  
  return function(value)
  {
    //  filter stuff here
    return value.replace(/&#(\d+);/g, function(match, dec) {
       return String.fromCharCode(dec);
    });
  }
}
