/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let fieldsArray = [...fields];
    let newObj ={};
    fieldsArray.forEach((val)=>(obj.hasOwnProperty(val))?newObj[val]=obj[val]:'')
    
    return newObj;
};
