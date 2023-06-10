import React, { createContext, useState, useEffect } from 'react';
import LOCATIONS from '../data/original-target-locations';

export const TargetContext = createContext();

export const TargetProvider = ({children}) => {
    const [targets, setTargets] = useState(LOCATIONS);

    useEffect(() => {
        // console.log(targets);
    }, [targets]);

    return(
        <TargetContext.Provider value={{targets, setTargets}}>
            {children}
        </TargetContext.Provider>
    )
}