import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({children}) => {
    const initialTime = localStorage.getItem('timer') || 0; // Retrieve time from localStorage or set it to 0
    const [time, setTime] = useState(Number(initialTime));

    // Utility function to format time in "00:00:00" format
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
    
        return `${hours}:${minutes}:${seconds}`;
    };
  
    useEffect(() => {
        if(time !== 0) {
            const timerInterval = setInterval(() => {
                setTime((prevTime) => {
                    const updatedTime = prevTime + 1;
                    localStorage.setItem('timer', updatedTime.toString()); // Save time in localStorage
                    return updatedTime;
                  });
              }, 1000);
            
              return () => clearInterval(timerInterval);
        }
      }, [time]);

    return(
        <TimerContext.Provider value={{time: formatTime(time), setTime}}>
            {children}
        </TimerContext.Provider>
    )
}