export function calculateRemainingTime(timestamp) {
    // Convert BigInt timestamp to milliseconds
    const milliseconds = Number(timestamp) * Number(1000n);

    // Get current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate remaining time in milliseconds
    let remainingTime = milliseconds - currentTime;

    // Convert remaining time to positive value if negative
    if (remainingTime < 0) {
        remainingTime *= -1;
    }

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return {
        days: days || '00',
        hours: (hours < 10 ? `0${hours}` : hours) || '00',
        minutes: (minutes < 10 ? `0${minutes}` : minutes) || '00',
        seconds: (seconds < 10 ? `0${seconds}` : seconds) || '00'
    };
}