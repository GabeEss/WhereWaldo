import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../Header";
import backgroundImage from "../../images/background/OnePieceWheresWaldo.png";
import "../../css/Gamepage.css";
import { calculateRelativeCoordinates, calculateNewTargetLocations } from "../../tools/calculate-coordinates";
import { TargetContext } from "../../contexts/TargetContext";

const Gamepage = () => {
    const imageRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const {setTargets} = useContext(TargetContext);

    const MIN_ZOOM_LEVEL = 1;
    const MAX_ZOOM_LEVEL = 2;
  
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

    return(
        <div className="Gamepage">
            <Header/>
            <div className="game-container">
                <div className="Description"><h1>Find the Straw Hats</h1></div>
                <div className="description-separator"></div>
                <div className="picture-container">
                    <img 
                    className="game-image"
                    alt=""
                    src={backgroundImage}
                    onClick={calculateRelativeCoordinates} // for finding initial target
                    style={imageStyle}
                    ref={imageRef}
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default Gamepage;