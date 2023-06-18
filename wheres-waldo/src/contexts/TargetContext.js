import React, { createContext, useState } from 'react';
import LOCATIONS from '../data/original-target-locations';

// This context contains the location of each target.

export const TargetContext = createContext();

export const TargetProvider = ({children}) => {
    const [targets, setTargets] = useState(LOCATIONS);

    return(
        <TargetContext.Provider value={{targets, setTargets}}>
            {children}
        </TargetContext.Provider>
    )
}