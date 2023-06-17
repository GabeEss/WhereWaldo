import React, {useContext, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TimerContext } from "../contexts/TimerContext";
import "../css/StickyHeader.css";
import { useWindowScroll } from "react-use";

const StickyHeader = ({ isVisible }) => {
  const { y: scrollY } = useWindowScroll();
  const [isSticky, setIsSticky] = useState(false);
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
        <>
          {isVisible && (
            <div className="sticky-header">
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
          )}
        </>
      );
    };

export default StickyHeader;