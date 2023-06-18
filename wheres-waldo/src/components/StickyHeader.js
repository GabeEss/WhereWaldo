import React, {useContext} from "react";
import { useNavigate} from "react-router-dom";
import { TimerContext } from "../contexts/TimerContext";
import "../css/StickyHeader.css";

const StickyHeader = ({ isVisible }) => {
  const { time, setTime } = useContext(TimerContext);
  const navigate = useNavigate();

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
        setTime(0);
    }

    return (
        <div>
            <div className={`sticky-header${!isVisible ? " hidden" : ""}`}>
            <button className="header-button" onClick={handleHome}>
                Home
            </button>
            <button className="header-button" onClick={handlePlay}>
                Play
            </button>
            <button className="header-button" onClick={handleGiveUp}>
                Give up
            </button>
            <h3 className="time">Time: {time}</h3>
            </div>
        </div>     
      );
    };

export default StickyHeader;