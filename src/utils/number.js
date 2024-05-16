export function formattedAmountToAha(amount){
    // Convert the number to a string and divide by 10^18
    const formattedAmount = (parseFloat(amount) / Math.pow(10, 18)).toString();

    return formattedAmount; 
}


/**
* Formats a number to a specified number of decimal places with optional comma separators.
* @param {number} value - The number to format.
* @param {number} minDecimals - The minimum number of decimal places.
* @param {number} maxDecimals - The maximum number of decimal places.
* @returns {string} - The formatted number as a string.
*/
export function formatNumber(value, minDecimals, maxDecimals = 0) {
 if (typeof value !== 'number') {
   throw new TypeError('Value must be a number');
 }
 
 if (typeof minDecimals !== 'number' || typeof maxDecimals !== 'number') {
   throw new TypeError('minDecimals and maxDecimals must be numbers');
 }

 const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: minDecimals,
   maximumFractionDigits: maxDecimals,
 });

 return formatter.format(value);
}