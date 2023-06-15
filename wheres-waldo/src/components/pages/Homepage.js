import React, { useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { ConfirmedHitContext } from "../../contexts/ConfirmedHitContext";

const Homepage = () => {
    const {hits} = useContext(ConfirmedHitContext);

    return(
        <div>
            <Header/>
                {hits}
            <Footer/>
        </div>
    )
}

export default Homepage;