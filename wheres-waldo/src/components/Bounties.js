import React, {useState, useEffect, useContext} from "react";
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
import { ConfirmedHitContext } from "../contexts/ConfirmedHitContext";

const Bounties = () => {
    const {hits} = useContext(ConfirmedHitContext);
    const isTargetHit = (target) => hits.has(target); // check the Set for the target
    const [resetKey, setResetKey] = useState(Date.now());

    useEffect(() => {
      // Reset the key when the hits set changes
      setResetKey(Date.now());
    }, [hits]);

  return (
    // If target is selected, apply the 'caught' class and the wanted poster becomes monochromatic.
    <div key={resetKey} className="bounties">
      <div className={isTargetHit("luffy") ? "caught" : ""}>
        <img className="bounty" src={luffy} alt="" />
      </div>
      <div className={isTargetHit("zoro") ? "caught" : ""}>
        <img className="bounty" src={zoro} alt="" />
      </div>
      <div className={isTargetHit("sanji") ? "caught" : ""}>
        <img className="bounty" src={sanji} alt="" />
      </div>
      <div className={isTargetHit("nami") ? "caught" : ""}>
        <img className="bounty" src={nami} alt="" />
      </div>
      <div className={isTargetHit("robin") ? "caught" : ""}>
        <img className="bounty" src={robin} alt="" />
      </div>
      <div className={isTargetHit("usopp") ? "caught" : ""}>
        <img className="bounty" src={usopp} alt="" />
      </div>
      <div className={isTargetHit("chopper") ? "caught" : ""}>
        <img className="bounty" src={chopper} alt="" />
      </div>
      <div className={isTargetHit("franky") ? "caught" : ""}>
        <img className="bounty" src={franky} alt="" />
      </div>
      <div className={isTargetHit("brooke") ? "caught" : ""}>
        <img className="bounty" src={brooke} alt="" />
      </div>
      <div className={isTargetHit("jinbe") ? "caught" : ""}>
        <img className="bounty" src={jinbe} alt="" />
      </div>
    </div>
    )
}

export default Bounties;