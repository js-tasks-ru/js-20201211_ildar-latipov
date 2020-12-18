/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let cloneObj = JSON.parse(JSON.stringify(obj));
    let fieldsArray = [...fields];
    fieldsArray.forEach((val)=>(obj.hasOwnProperty(val))?delete cloneObj[val]:'');
    return cloneObj;
};
