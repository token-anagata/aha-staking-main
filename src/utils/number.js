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
/**
* Formats the input number with commas for thousands separators.
* @param {number} num - The number to format.
* @returns {string} - The formatted number as a string.
*/
export function formatInputNumber(num){
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
* Approach ensures the function can handle incorrect inputs 
* @param {string} formattedString - The string to format.
* @returns {number} - The formatted string as a number.
*/
export function formattedStringToNumber(formattedString) {
  // Check if input is a string
  if (typeof formattedString !== 'string') {
    throw new Error('Input must be a string');
  }

  // Remove commas from the formatted string
  const numericString = formattedString.replace(/,/g, '');

  // Check if the resulting string is a valid number
  if (isNaN(numericString)) {
    throw new Error('Input string is not a valid number');
  }

  // Convert the string to a number
  const number = Number(numericString);

  return number;
}