// Get pixel color under the mouse.
var robot = require("robotjs");

// Get mouse position.
var mouse = robot.getMousePos();

// Get pixel color in hex format.
var hex = robot.getPixelColor(mouse.x, mouse.y);
console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
