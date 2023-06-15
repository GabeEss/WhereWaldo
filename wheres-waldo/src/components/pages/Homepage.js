import React, { useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { ConfirmedHitContext } from "../../contexts/ConfirmedHitContext";

const Homepage = () => {
    const {hits} = useContext(ConfirmedHitContext);

    return(
        <div>
            <Header/>
                <h3>Correct choices will be displayed in blue. Incorrect choices will be displayed in orange.</h3>
                {hits}
            <Footer/>
        </div>
    )
}

export default Homepage;