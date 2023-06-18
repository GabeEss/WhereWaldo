import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../contexts/TimerContext";
import { ConfirmedHitContext } from "../contexts/ConfirmedHitContext";
import "../css/App.css";

const Header = () => {
    const navigate = useNavigate();
    const { time, setTime } = useContext(TimerContext);
    const { setHits } = useContext(ConfirmedHitContext);

    const handlePlay = () => {
        navigate("/Play");
        // Initialize the timer.
        if(time === "00:00:00") {
            setTime(1);
        }   
    };

    const handleHome = () => {
        navigate("/");
    }

    const handleGiveUp = () => {
        navigate("/GiveUp");
        setTime(0); // reset the time
        setHits(new Set()); // reset the confirmed hits
    }

    const handleScores = () => {
        navigate("/Scores");
    }

    return (
        <div>
            <div className="header">
                <div className="pages">
                    <button className="header-button" onClick={handleHome}>Home</button>
                    <button className="header-button" onClick={handlePlay}>Play</button>
                    <button className="header-button" onClick={handleGiveUp}>Give Up</button>
                    <button className="header-button" onClick={handleScores}>High Scores</button>
                    <h3 className="time">Time: {time}</h3>
                </div>
            </div>
        </div>
    )
}

export default Header;