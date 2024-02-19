//import { dualRangeSlider } from "./modules/DualRangeSlider";
//import { inViewSticky } from "./modules/InViewSticky";
const dualRangeSlider = require("./modules/DualRangeSlider");
const inViewSticky = require("./modules/InViewSticky");

document.addEventListener("DOMContentLoaded", () => {
  inViewSticky();
  dualRangeSlider(0, 400, 100, 300);
});
