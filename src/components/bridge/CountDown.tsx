import React, { useEffect, useState } from 'react';

export default function CountDown() {

  const [time, setTime] = useState({hrs: 23, mins: 59, secs: 59});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time.secs > 0) {
        setTime({...time, secs: time.secs - 1});
      } else if (time.mins > 0) {
        setTime({...time, mins: time.mins - 1, secs: 59});
      } else if (time.hrs > 0) {
        setTime({...time, hrs: time.hrs - 1, mins: 59, secs: 59});
      }
    }, 1000);
    return () => clearTimeout(timer);
  
  }, [time]);

  return (
    <div className='countdown'>
      Within
      <span className='countdown__time'> 0 Days {time.hrs}:{time.mins}:{time.secs} </span>
    </div>
  );










}