import React, { useRef, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import backgroundImage from "../../images/background/OnePieceWheresWaldo.png";
import "../../css/Gamepage.css";
import { calculateRelativeCoordinates } from "../../tools/calculate-coordinates";
import { TargetContext } from "../../contexts/TargetContext";
import { TimerContext } from "../../contexts/TimerContext";
import { ConfirmedHitContext } from "../../contexts/ConfirmedHitContext";
import LOCATIONS from "../../data/original-target-locations";

const Gamepage = () => {
    const squareRef = useRef(null);

    const {targets} = useContext(TargetContext);
    const {setHits} = useContext(ConfirmedHitContext);

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

    return(
        <div className="Gamepage">
            <Header/>
            <div className="game-container">
                <div className="header-separator"></div>
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
    )
}

export default Gamepage;