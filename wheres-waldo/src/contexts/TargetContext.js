import React, { createContext, useState } from 'react';
import LOCATIONS from '../data/original-target-locations';

export const TargetContext = createContext();

export const TargetProvider = ({children}) => {
    const [targets, setTargets] = useState(LOCATIONS);

    return(
        <TargetContext.Provider value={{targets, setTargets}}>
            {children}
        </TargetContext.Provider>
    )
}