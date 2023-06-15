import React, {useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TimerContext } from "../contexts/TimerContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isGiveUpPage = location.pathname === "/GiveUp";
    const { time, setTime } = useContext(TimerContext);

    const handlePlay = () => {
        navigate("/Play");
        // Initialize the timer.
        if(time === "00:00:00") {
            setTime(1);
        }   
    };

    // User go home on click.
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
                <h3>Time: {time}</h3>
            </div>
            {!isGiveUpPage && (
                <div className="description">
                    <h1>Find the Straw Hats from ONE P<span style={{ color: 'red' }}>I</span>ECE</h1>
                </div>
            )}
        </div>
    )
}

export default Header;