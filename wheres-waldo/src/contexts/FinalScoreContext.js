import React, { createContext, useState } from 'react';

// This context contains the location of each target.

export const FinalScoreContext = createContext();

export const ScoreProvider = ({children}) => {
    const [score, setScore] = useState(0);

    return(
        <FinalScoreContext.Provider value={{score, setScore}}>
            {children}
        </FinalScoreContext.Provider>
    )
}