import React from "react";
import brooke from "../images/character/Brooke.jpg";
import chopper from "../images/character/Chopper.jpg";
import luffy from "../images/character/Luffy.jpg";
import sanji from "../images/character/Sanji.png";
import zoro from "../images/character/Zoro.png";
import jinbe from "../images/character/Jinbe.png";
import nami from "../images/character/Nami.png";
import usopp from "../images/character/Usopp.png";
import robin from "../images/character/Robin.png";
import franky from "../images/character/Franky.png";
import "../css/Bounties.css";

const Bounties = () => {
    return(
        <div className="bounties">
            <div><img className="bounty" src={luffy} alt=""></img></div>
            <div><img className="bounty" src={zoro} alt=""></img></div>
            <div><img className="bounty" src={sanji} alt=""></img></div>
            <div><img className="bounty" src={nami} alt=""></img></div>
            <div><img className="bounty" src={robin} alt=""></img></div>
            <div><img className="bounty" src={usopp} alt=""></img></div>
            <div><img className="bounty" src={chopper} alt=""></img></div>
            <div><img className="bounty" src={franky} alt=""></img></div>
            <div><img className="bounty" src={brooke} alt=""></img></div>
            <div><img className="bounty" src={jinbe} alt=""></img></div>
        </div>
    )
}

export default Bounties;