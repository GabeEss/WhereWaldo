import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase';

export const FinalScoreContext = createContext();

export const ScoreProvider = ({children}) => {
    const [score, setScore] = useState([]);
 
    const fetchPost = async () => {
        await getDocs(collection(db, "high scores"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setScore(newData);                
                // console.log(score, newData);
        })
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])

    return(
        <FinalScoreContext.Provider value={{score, setScore}}>
            {children}
        </FinalScoreContext.Provider>
    )
}