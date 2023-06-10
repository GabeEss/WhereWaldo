import LOCATIONS from "../data/original-target-locations";

// This function is used to calculate the coordinates of the target relative to a fixed
// reference point in the image. This is a developer tool and not necessary for game function.
// Remove or comment it out in the build version of the game. To use, make sure to set the image size
// to it's original 1840x1300 in styling. Confirm the size is correct in the DOM.
const calculateRelativeCoordinates = (event) => {
    const image = event.target;
    const boundingRect = image.getBoundingClientRect();

    const targetAreaX = event.clientX - boundingRect.left;
    const targetAreaY = event.clientY - boundingRect.top;

    // console.log("Relative Coordinates:", targetAreaX, targetAreaY);
};

const calculateNewTargetLocations = (zoomLevel) => {
    const newLocations = {};
    
    // Iterate over each location in the LOCATIONS object
    for (const key in LOCATIONS) {
        if (LOCATIONS.hasOwnProperty(key)) {
            const [originalX, originalY] = LOCATIONS[key];
            
            // console.log(zoomLevel);

            // Calculate the new target coordinates based on the zoom level
            const newX = originalX * zoomLevel;
            const newY = originalY * zoomLevel;
            
            // Add the new target location to the newLocations object
            newLocations[key] = [newX, newY];
        }
    }
  
    return newLocations;
};

export { calculateRelativeCoordinates, calculateNewTargetLocations };