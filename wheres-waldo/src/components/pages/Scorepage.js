import React, {useState, useEffect} from "react";
import Header from "../Header";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import "../../css/Scorepage.css";

const Scorepage = () => {
    const [score, setScore] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchScores = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "high scores"));
          const scoresData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
            
            scoresData.sort((a, b) => a.score - b.score); // Sort scores in ascending order

            setScore(scoresData);
            setLoading(false);

        } catch (error) {
          setLoading(false);
          console.error("Error fetching scores: ", error);
        }
      };
    
   
    useEffect(()=>{
        fetchScores();
    }, [loading]);
   

    return (
        <div>
          <Header />
          <div className="score-page">
            <div className="score-container">
              {loading ? (
                <div>Loading scores...</div>
              ) : (
                <ol className="score-list">
                  {score.map((scoreItem, index) => (
                    <li className="score-item" key={scoreItem.id}>
                      <p className="username">Username: {scoreItem.user}</p>
                      <p className="time">Time: {scoreItem.time}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default Scorepage;