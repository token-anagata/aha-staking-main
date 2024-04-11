import React, { useState, useEffect } from 'react'
import { calculateTimeLeft } from '../../appCore/globalFunctions';




// function component
const FlipUnitContainer = ({ currentDigit, shuffle, unit }) => {

  // assign digit values
  // let previousDigit = +currentDigit + 1


  // to prevent a negative value
  // if (unit === 'seconds') {
  //   previousDigit = previousDigit === 60 ? 59 : String(currentDigit).padStart(2, '0');
  // } else if (unit === 'minutes') {
  //   previousDigit = previousDigit === 60 ? '00' : String(currentDigit).padStart(2, '0');
  // } else if (unit === 'hours') {
  //   previousDigit = previousDigit === 25 ? 24 : String(currentDigit).padStart(2, '0');
  // } else {
  //   previousDigit = previousDigit !== 0 ? currentDigit : String(previousDigit).padStart(2, '0');
  // }


  // shuffle digits
  // const digit1 = shuffle ? previousDigit : currentDigit;
  // const digit2 = !shuffle ? previousDigit : currentDigit;


  return (
    <div className={'flip-timer-card-container'} style={{ 'perspective-origin': '50% 50%', 'perspective': '300px' }}>
      <div className={`flip-timer-card flip-card-top`}>
        <span className={`flip-timer-card-text translate-y-1/2`}>{currentDigit}</span>
      </div>
      <div className={`flip-timer-card flip-card-bottom`}>
        <span className={`flip-timer-card-text -translate-y-1/2`}>{currentDigit}</span>
      </div>
      

      <div className={`flex justify-center absolute left-0 w-full px-1 h-1/2 overflow-hidden ${shuffle ? 'flip-timer-fold' : 'flip-timer-unfold'}`} style={{ 'backface-visibility': 'hidden' }}>
        <span className={`flip-timer-card-text ${shuffle ? 'translate-y-1/2' : '-translate-y-1/2'}`}>{currentDigit}</span>
      </div>
      <div className={`flex justify-center absolute left-0 w-full px-1 h-1/2 overflow-hidden ${!shuffle ? 'flip-timer-fold' : 'flip-timer-unfold'}`} style={{ 'backface-visibility': 'hidden' }}>
        <span className={`flip-timer-card-text ${!shuffle ? 'translate-y-1/2' : '-translate-y-1/2'}`}>{currentDigit}</span>
      </div>
    </div>
  );
};


const FlipTimer = ({ endTime }) => {

  const [timeLeft, setTimeLeft] = useState({
          days: '00', hours: '00',
          minutes: '00', seconds: '00',
          daysShuffle: true, hoursShuffle: true,
          minutesShuffle: true, secondsShuffle: true
        })
  



  useEffect(() => {
    const timerID = setInterval(() => {
      calculateTimeLeft(endTime).then(remainingTime => {

        // on day chanage, update days and shuffle state
        if (remainingTime.days !== timeLeft.days) { var daysShuffle = !timeLeft['daysShuffle']; }
        // on hour chanage, update hours and shuffle state
        if (remainingTime.hours !== timeLeft.hours) { var hoursShuffle = !timeLeft['hoursShuffle']; }
        // on minute chanage, update minutes and shuffle state
        if (remainingTime.minutes !== timeLeft.minutes) { var minutesShuffle = !timeLeft['minutesShuffle']; }
        // on second chanage, update seconds and shuffle state
        if (remainingTime.seconds !== timeLeft.seconds) { var secondsShuffle = !timeLeft['secondsShuffle']; }

        setTimeLeft({
          days: remainingTime.days, hours: remainingTime.hours,
          minutes: remainingTime.minutes, seconds: remainingTime.seconds,
          daysShuffle: daysShuffle,
          hoursShuffle: hoursShuffle,
          minutesShuffle: minutesShuffle,
          secondsShuffle: secondsShuffle
        })
      })
    }, 50);

    // console.log(timeLeft);
    return () => clearInterval(timerID);
  }, [timeLeft, endTime])
  


  return (
    <div className={`grid grid-cols-4 gap-2 w-full max-w-sm mx-auto mb-3`}>
      <FlipUnitContainer
        unit={'days'}
        currentDigit={timeLeft.days}
        shuffle={timeLeft.daysShuffle}
      />
      <FlipUnitContainer
        unit={'hours'}
        currentDigit={timeLeft.hours}
        shuffle={timeLeft.hoursShuffle}
      />
      <FlipUnitContainer
        unit={'minutes'}
        currentDigit={timeLeft.minutes}
        shuffle={timeLeft.minutesShuffle}
      />
      <FlipUnitContainer
        unit={'seconds'}
        currentDigit={timeLeft.seconds}
        shuffle={timeLeft.secondsShuffle}
      />
    </div>
  )
}

export default FlipTimer