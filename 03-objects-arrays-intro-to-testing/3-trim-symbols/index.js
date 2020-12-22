/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if(typeof size !== 'number'){
        return string;
    }
    if (size === 0 | string === ''){
        return ''
    }
    let result = string[0];
    let counter = 1;
    for(let i =1; i<string.length; i++){
        if(string[i-1]!==string[i]){
          result+= string[i];
            counter = 1;
        }
        else if(counter<size){
            result+= string[i];
            counter++;
        }
    }
    return result
}
