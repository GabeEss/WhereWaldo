import React, {useState, useEffect} from "react";
import Header from "../Header";
import StickyHeader from "../StickyHeader";
import Footer from "../Footer";
import solution from "../../images/background/OnePieceWheresWaldoSolution.png";
import "../../css/Givepage.css";

const Givepage = () => {
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
            <div className="game-container">
                <div className="header-separator"></div>
                <img src={solution}></img>
            </div>
            <Footer/>
        </div>
    )
}

export default Givepage;