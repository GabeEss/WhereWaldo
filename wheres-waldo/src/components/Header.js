import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isGiveUpPage = location.pathname === "/GiveUp";

    const handlePlay = () => {
        navigate("/Play");
    };

    // User go home on click.
    const handleHome = () => {
        navigate("/");
    }

    const handleGiveUp = () => {
        navigate("/GiveUp");
    }

    return (
        <div className="header">
            <div className="pages">
                <button className="header-button" onClick={handleHome}>Home</button>
                <button className="header-button" onClick={handlePlay}>Play</button>
                <button className="header-button" onClick={handleGiveUp}>Give up</button>
            </div>
            {!isGiveUpPage && (
                <div className="Description">
                    <h1>Find the Straw Hats from ONE PIECE</h1>
                </div>
            )}
        </div>
    )
}

export default Header;