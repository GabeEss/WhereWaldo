import React, {useContext, useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TimerContext } from "../contexts/TimerContext";
import "../css/App.css";

const Header = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const isGiveUpPage = location.pathname === "/GiveUp";
    const { time, setTime } = useContext(TimerContext);

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
        <div className="header">
            <div className="pages">
                <button className="header-button" onClick={handleHome}>Home</button>
                <button className="header-button" onClick={handlePlay}>Play</button>
                <button className="header-button" onClick={handleGiveUp}>Give up</button>
                <h3 className="time">Time: {time}</h3>
            </div>
        </div>
    )
}

export default Header;