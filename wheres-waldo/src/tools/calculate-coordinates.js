// This function is used to calculate the coordinates of the target relative to a fixed
// reference point in the image. This is a developer tool and not necessary for game function.
// Remove or comment it out in the build version of the game. To use, make sure to set the image size
// to it's original 1840x1300 in styling. Confirm the size is correct in the DOM.
const calculateRelativeCoordinates = (event) => {
    const image = event.target;
    const boundingRect = image.getBoundingClientRect();

    const targetAreaX = event.clientX - boundingRect.left;
    const targetAreaY = event.clientY - boundingRect.top;

    console.log("Relative Coordinates:", targetAreaX, targetAreaY);
};

export { calculateRelativeCoordinates };