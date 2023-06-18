import React, { createContext, useState, useEffect } from 'react';

// Contains the users confirmed hits.

export const ConfirmedHitContext = createContext();

export const HitProvider = ({children}) => {
    const storedHits = JSON.parse(localStorage.getItem('hits'));
    const oldSet = new Set(storedHits);
    const initialHits = oldSet ? oldSet : new Set();
    const [hits, setConfirmedHits] = useState(initialHits);

    useEffect(() => {
        // Update localStorage whenever hits change
        localStorage.setItem('hits', JSON.stringify([...hits]));
      }, [hits]);


      const setHits = (newHit) => {
        setConfirmedHits((prevHits) => {
            if (newHit.size === 0) {
              return new Set(); // Reset to an empty set
            }
            const mergedSet = new Set([...prevHits]);
            mergedSet.add(newHit);
            return mergedSet;
          });
      };

    return(
        <ConfirmedHitContext.Provider value={{ hits, setHits }}>
            {children}
        </ConfirmedHitContext.Provider>
    )
}