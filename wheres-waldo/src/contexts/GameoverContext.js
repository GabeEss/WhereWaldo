import React, { createContext, useState } from 'react';

// This context dictates when the user can submit their score.

export const GameOverContext = createContext();

export const GameOverProvider = ({children}) => {
    const [gameover, setGameOver] = useState(false);

    return(
        <GameOverContext.Provider value={{gameover, setGameOver}}>
            {children}
        </GameOverContext.Provider>
    )
}