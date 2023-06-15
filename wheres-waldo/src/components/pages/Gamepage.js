import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import backgroundImage from "../../images/background/OnePieceWheresWaldo.png";
import "../../css/Gamepage.css";
import { calculateRelativeCoordinates, calculateNewTargetLocations, isTargetFound } from "../../tools/calculate-coordinates";
import { TargetContext } from "../../contexts/TargetContext";
import LOCATIONS from "../../data/original-target-locations";

const Gamepage = () => {
    const imageRef = useRef(null);
    const squareRef = useRef(null);

    const [zoomLevel, setZoomLevel] = useState(1);
    const {setTargets} = useContext(TargetContext);
    const [isHovered, setHovered] = useState(false);

    const MIN_ZOOM_LEVEL = 1;
    const MAX_ZOOM_LEVEL = 2;
  
    // Add ablity to zoom in on the image.
    useEffect(() => {
        const handleScroll = (event) => {
          const delta = event.deltaY;
          if (delta > 0) {
            // Zoom out
            setZoomLevel((prevZoomLevel) =>
              Math.max(prevZoomLevel - 0.1, MIN_ZOOM_LEVEL)
            );
          } else {
            // Zoom in
            setZoomLevel((prevZoomLevel) =>
              Math.min(prevZoomLevel + 0.1, MAX_ZOOM_LEVEL)
            );
          }

        };
  
        const imageElement = imageRef.current;

        if (imageElement) {
            imageElement.addEventListener("wheel", handleScroll);
        }
    
        // Remove the previous zoom effect when the component changes. This is a cleanup
        // statement.
        return () => {
            if (imageElement) {
                imageElement.removeEventListener("wheel", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        // Update target locations based on new zoom level
        const newTargetLocations = calculateNewTargetLocations(zoomLevel);
        setTargets(newTargetLocations);
    }, [zoomLevel])

    const handleResetZoom = () => {
        setZoomLevel(1);
    };
  
    const imageStyle = {
      transform: `scale(${zoomLevel})`,
    };

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
        
        // Show the context menu with a list of names
        const menu = document.createElement('div');
        menu.classList.add('menu');
        menu.style.top = `${menuPosition.top}px`;
        menu.style.left = `${menuPosition.left}px`;

        names.forEach((name) => {
            const menuItem = document.createElement('div');
            menuItem.textContent = name;
            menuItem.addEventListener('click', () => handleNameSelection(name, menuPosition));
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
        const location = LOCATIONS[selectedName];
        if(location)
            console.log(location); // or perform any other action with the location

        menuCheck();
    }

    const handleMouseMove = (event) => {
        // document.body.style.cursor = 'none';
        const square = document.querySelector(".square");
      
        const squareSize = 50;

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
      
        setHovered(true);
      };

      const handleMouseLeave = () => {
        document.body.style.cursor = "auto";
        const square = squareRef.current;
        if (square && square.parentNode === document.body) {
          document.body.removeChild(square);
        }
        setHovered(false);
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
                    // onClick={calculateRelativeCoordinates} // for finding initial target without zoom
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={imageStyle}
                    ref={imageRef}
                    ></img>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Gamepage;