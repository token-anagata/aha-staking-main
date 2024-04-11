export function formattedAmountToAha(amount){
    // Convert the number to a string and divide by 10^18
    const formattedAmount = (parseFloat(amount) / Math.pow(10, 18)).toString();

    return formattedAmount; 
}