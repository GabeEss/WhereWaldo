import React, {useContext} from "react";
import Header from "../Header";
import { FinalScoreContext } from "../../contexts/FinalScoreContext";

const Scorepage = () => {
    const { score } = useContext(FinalScoreContext);
   

    return(
        <div>
            <Header/>
            <div className="score-page">
                <h1>High Scores:</h1>
                <div className="score-container">
                    {score}
                </div>
            </div>
        </div>
    )
}

export default Scorepage;