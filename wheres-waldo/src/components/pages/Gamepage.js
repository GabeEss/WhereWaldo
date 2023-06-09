import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import StickyHeader from "../StickyHeader";
import PlayerSubmit from "../PlayerSubmit";
import backgroundImage from "../../images/background/OnePieceWheresWaldo.png";
import "../../css/Gamepage.css";
// import { calculateRelativeCoordinates } from "../../tools/calculate-coordinates";
import { TargetContext } from "../../contexts/TargetContext";
import { TimerContext } from "../../contexts/TimerContext";
import { ConfirmedHitContext } from "../../contexts/ConfirmedHitContext";
import { GameOverContext } from "../../contexts/GameoverContext";
import { FinalScoreContext } from "../../contexts/FinalScoreContext";
import LOCATIONS from "../../data/original-target-locations";

const Gamepage = () => {
    const navigate = useNavigate();
    const squareRef = useRef(null);
    const {targets} = useContext(TargetContext);
    const {hits, setHits} = useContext(ConfirmedHitContext);
    const {time, setTime} = useContext(TimerContext);
    const { gameover, setGameOver } = useContext(GameOverContext);
    const { setScore } = useContext(FinalScoreContext);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    const squareSize = 100;

    const menuCheck = () => {
        const menu = document.querySelector('.menu');
        if(menu) {
            document.body.removeChild(menu);
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        menuCheck();

        const names = Object.keys(LOCATIONS);

        // Calculate the position of the context menu based on the click event and scroll position
        const menuPosition = {
            top: event.clientY + window.scrollY,
            left: event.clientX + window.scrollX
        };

        // Get the position of the targeting square.
        const squarePosition = {
            top: event.clientY + window.scrollY - squareSize / 2,
            left: event.clientX + window.scrollX - squareSize / 2,
        };
        
        // Show the context menu with a list of names
        const menu = document.createElement('div');
        menu.classList.add('menu');
        menu.style.top = `${menuPosition.top}px`;
        menu.style.left = `${menuPosition.left}px`;

        names.forEach((name) => {
            const menuItem = document.createElement('div');
            menuItem.textContent = name;
            menuItem.addEventListener('click', () => handleNameSelection(name, squarePosition));
            menuItem.addEventListener('mouseover', () => {
                menuItem.style.background = 'lightgray';
            });
            menuItem.addEventListener('mouseout', () => {
                menuItem.style.background = 'white';
            });
            menu.appendChild(menuItem);
        });

        document.body.appendChild(menu);
        
    };

    const handleNameSelection = (selectedName, position) => {
        let found = false;
        const location = LOCATIONS[selectedName];

        // Confirm the selected choice is valid.
        if(location) {
            // The range of the target should be within 50px of it's location.
            let xLowerBoundary = targets[selectedName][0] - squareSize;
            if(xLowerBoundary < 0)
                xLowerBoundary = 0;

            let xUpperBoundary = targets[selectedName][0] + squareSize;
            if(xUpperBoundary > 1840)
                xUpperBoundary = 1840;
            
            // Set the range of the yaxis too.
            let yLowerBoundary = targets[selectedName][1] - squareSize;
            if(yLowerBoundary < 0)
                yLowerBoundary = 0;

            let yUpperBoundary = targets[selectedName][1] + squareSize;
            if(yUpperBoundary > 1300)
                yUpperBoundary = 1300;

            // Check the click position against range of the target.
            if(position.top >= yLowerBoundary && position.top <= yUpperBoundary) {
                if(position.left >= xLowerBoundary && position.left <= xUpperBoundary) {
                    found = true;   
                }
            }

            if(found) {
                setHits(selectedName);
                handleSuccess(position);
            } else {
                handleFailure(position);
            }
        }

        menuCheck();
    }

    const handleFailure = (position) => {
        const div = document.createElement('div');
        div.className = 'orange-square';
        div.style.position = 'absolute';
        div.style.top = `${position.top}px`;
        div.style.left = `${position.left}px`;

        document.body.appendChild(div);

        setTimeout(() => {
            document.body.removeChild(div);
        }, 2000);
    }

    const handleSuccess = (position) => {
        // This function is a little behind the actual number in hits.size
        if(hits.size < 9) {
            const div = document.createElement('div');
            div.className = 'blue-square';
            div.style.position = 'absolute';
            div.style.top = `${position.top}px`;
            div.style.left = `${position.left}px`;

            document.body.appendChild(div);

            setTimeout(() => {
                document.body.removeChild(div);
            }, 2000);
        }
    }

    const handleMouseMove = (event) => {
        // Remember to comment this line out, if you're going to change the size of the targeting box.
        document.body.style.cursor = 'none';
        const square = document.querySelector(".square");
      
        const squarePosition = {
          top: event.clientY + window.scrollY - squareSize / 2,
          left: event.clientX + window.scrollX - squareSize / 2,
        };
      
        if (!square) {
          const newSquare = document.createElement("div");
          newSquare.classList.add("square", "no-pointer-events");
          squareRef.current = newSquare; // Use a ref to keep a reference to the square element
          document.body.appendChild(newSquare);
        } else {
          square.style.left = `${squarePosition.left}px`;
          square.style.top = `${squarePosition.top}px`;
        }
      };

      const handleMouseLeave = () => {
        document.body.style.cursor = "auto";
        const square = squareRef.current;
        if (square && square.parentNode === document.body) {
          document.body.removeChild(square);
        }
      };

      useEffect(() => {
        // If the game isn't over, but the time is somehow at 0.
        if (time === "00:00:00" && !gameover) {
            // Set the URL to the home page
            navigate("/");
        }

        const handleScroll = () => {
          setIsHeaderVisible(window.pageYOffset === 0);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      useEffect(() => {
        if(hits.size === 10) handleGameOver();
      }, [hits])

      // Checks the number of targets selected. Right now (2023), there are 10 Straw Hat pirates.
        const handleGameOver = () => {
            if (hits.size === 10) {
                setScore(time);
                setTime(0); // reset the time
                setHits(new Set()); // reset the confirmed hits
                setGameOver(true);
            }
        }

    return(
        <div>
            {gameover ? 
                <div className="overlay">
                        <div className="gameover">
                            <PlayerSubmit/>
                        </div>
                </div> :
                <div className="Gamepage">
                    <Header/>
                    <StickyHeader isVisible={!isHeaderVisible}/>
                    <div className="game-container">
                        <div className="header-separator">
                        </div>
                            <div className="picture-container">
                                <img 
                                className="game-image"
                                alt=""
                                src={backgroundImage}
                                // onClick={calculateRelativeCoordinates} // for finding initial target
                                onClick={handleClick}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                ></img>
                            </div>
                    </div>
                </div>
            }
        </div>
        
    )
}

export default Gamepage;