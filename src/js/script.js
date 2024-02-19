import { dualRangeSlider } from "./modules/DualRangeSlider";
import { inViewSticky } from "./modules/InViewSticky";

document.addEventListener("DOMContentLoaded", () => {
  inViewSticky();
  dualRangeSlider(0, 400, 100, 300);
});
