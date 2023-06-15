import React, { createContext, useState } from 'react';

export const ConfirmedHitContext = createContext();

export const HitProvider = ({children}) => {
    const [hits, setConfirmedHits] = useState(new Set());

    const setHits = (newHit) => {
        setConfirmedHits((prevHits) => new Set([...prevHits, newHit]));
    };

    return(
        <ConfirmedHitContext.Provider value={{ hits, setHits }}>
            {children}
        </ConfirmedHitContext.Provider>
    )
}