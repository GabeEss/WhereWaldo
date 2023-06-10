import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate("/Play");
    };

    // User go home on click.
    const handleHome = () => {
        navigate("/");
    }

    return (
        <div className="header">
            <div className="pages">
                <button onClick={handleHome}>Home</button>
                <button onClick={handlePlay}>Play</button>
            </div>
        </div>
    )
}

export default Header;