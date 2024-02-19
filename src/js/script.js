import { dualRangeSlider } from "./modules/_dualRangeSlider";
import { inViewSticky } from "./modules/_inViewSticky";

document.addEventListener("DOMContentLoaded", () => {
  inViewSticky();
  dualRangeSlider(0, 400, 100, 300);
});
