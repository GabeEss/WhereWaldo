import Header from "../Header";
import Footer from "../Footer";
import solution from "../../images/background/OnePieceWheresWaldoSolution.png";
import "../../css/Givepage.css";

const Givepage = () => {
    return(
        <div>
            <Header/>
            <div className="game-container">
                <div className="header-separator"></div>
                <img src={solution}></img>
            </div>
            <Footer/>
        </div>
    )
}

export default Givepage;