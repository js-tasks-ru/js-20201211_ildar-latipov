/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    let result = arr.slice(); // copy array
    function compare(a,b){
        return a.normalize().localeCompare(b.normalize(), ['ru', 'en'], { caseFirst: 'upper' })
    }
    result.sort((nxt, prev) =>
        (param === 'desc')?compare(prev,nxt):compare(nxt,prev));    // sort array 
    return result;
}
