import React, { useContext, useEffect, useState } from "react";
import backgroundImage from "../../images/background/OnePieceWheresWaldo.png";
import "../../css/Homepage.css";
import Header from "../Header";
import StickyHeader from "../StickyHeader";
import Footer from "../Footer";
import Bounties from "../Bounties";
import { ConfirmedHitContext } from "../../contexts/ConfirmedHitContext";

const Homepage = () => {
    const {hits} = useContext(ConfirmedHitContext);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
          setIsHeaderVisible(window.pageYOffset === 0);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return(
        <div>
            <Header/>
            <StickyHeader isVisible={!isHeaderVisible}/>
            <div className="description">
                    <h1>Find the Straw Hats from ONE P<span style={{ color: 'red' }}>I</span>ECE</h1>
            </div>
            <Bounties/>
            <div className="explain">
                <h3>Correct choices will be displayed in blue. Incorrect choices will be displayed in orange.</h3>
                <h3>Click the play button to initiate the timer.</h3>
                <h3>You can return to the home page at an any time. Straw Hats who are caught will be greyed out.</h3>
            </div>
                {hits}
                <img className="sample-image" src={backgroundImage} alt=""></img>
            <Footer/>
        </div>
    )
}

export default Homepage;