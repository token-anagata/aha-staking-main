import { getMonthByPlanId } from "./stake";

export function calculateRemainingTime(timestamp) {
    // Convert BigInt timestamp to milliseconds
    const milliseconds = Number(timestamp);

    // Get current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate remaining time in milliseconds
    const remainingTime = milliseconds - currentTime;

    if(remainingTime < 1){
        return {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    }

    // Calculate remaining days, hours, minutes, and seconds
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return {
        days: days || '00',
        hours: (hours < 10 ? `0${hours}` : hours) || '00',
        minutes: (minutes < 10 ? `0${minutes}` : minutes) || '00',
        seconds: (seconds < 10 ? `0${seconds}` : seconds) || '00'
    };
}

export function getCurrentDate(date = new Date()){
    return `${date.getDate()}.${date.getUTCMonth() + 1}.${date.getFullYear()}`
}

export function addMonthDate(months, currentDate){
    currentDate.setMonth(currentDate.getMonth() + Number(months));

    return currentDate
}

export function getEstimatedMonths(months, currentDate = new Date()) {
    const addMonth = addMonthDate(months, currentDate)

    return getCurrentDate(addMonth);
}

export function getStakeDate(date){
    const stakeDate = new Date(date * 1000)

    return getCurrentDate(stakeDate)
}

export function getStakeEstimatedMonths(planId, date){
    const stakeDate = new Date(date * 1000)
    const month = getMonthByPlanId(planId)
    const addMonth = addMonthDate(month, stakeDate)

    return getCurrentDate(addMonth)
}


export function getTimeEstimatedMonths(planId, currentDate){
    const stakeDate = new Date(currentDate * 1000)
    const month = getMonthByPlanId(planId)
    const addMonth = addMonthDate(month, stakeDate)

    return addMonth.getTime()
}

