export const APR = [
    [0.0025, 0.0075, 0.015, 0.03, 0.045, 0.06], // 20,000 - 25,000
    [0.0025, 0.0150, 0.030, 0.06, 0.090, 0.12], // 25,000 - 50,000
    [0.0025, 0.0150, 0.045, 0.09, 0.135, 0.18], // 50,000 - 125,000
    [0.0025, 0.0150, 0.045, 0.12, 0.180, 0.24], // 125,000 - 250,000
    [0.0025, 0.0150, 0.045, 0.12, 0.225, 0.30], // 250,000 - 500,000
    [0.0025, 0.0150, 0.045, 0.12, 0.225, 0.36] // >= 500,000
];

export const STAKE_MONTH = ['1', '3', '6', '12', '18', '24']


export function getApr(duration, amount) {
    if(duration < 0 || amount < 0)
        return -1

    if(amount >= 20000 && amount < 25000){
        return 0;
    }else if(amount >= 25000 && amount < 50000){
        return 1;
    }else if(amount >= 50000 && amount < 125000){
        return 2;
    }else if(amount >= 125000 && amount < 250000){
        return 3;
    }else if(amount >= 250000 && amount < 500000){
        return 4;
    }else if(amount >= 500000){
        return 5;
    }

    return -1;
}

export function getAprPercentage(duration, amount){
    const aprIndex = getApr(duration, amount);

    if(aprIndex >= 0){
        return APR[aprIndex][duration];
    }

    return 0;
}

export function getCalculateApr(duration, amount){
    const aprIndex = getApr(duration, amount);

    if(aprIndex >= 0){
        const apr = APR[aprIndex][duration];
        const total = amount * apr;

        return total;
    } 
    
    return 0;
}

export function getPlanId(duration, amount){
    const aprIndex = getApr(duration, amount);

    if(aprIndex === 0){
        return aprIndex + 1 + duration;
    }

    if(aprIndex >= 0){
        const tDuration = 1 + duration;
        const tPlanId = 6 * aprIndex;
        const planId = tDuration + tPlanId;

        return planId;
    }

    return 0;
}

export function getMonthByPlanId(planId){
    const plan = getCalculateMonthByPlanId(planId)

    return STAKE_MONTH[plan]
}

export function getCalculateMonthByPlanId(planId){
    const plan = Number(planId);
    
    if(plan <= 6) return plan - 1
    if(plan % 6 === 0) return 5

    return (plan % 6) - 1
}
