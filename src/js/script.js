import { dualRangeSlider } from "./modules/dualRangeSlider";
import { inViewSticky } from "./modules/inViewSticky";

document.addEventListener("DOMContentLoaded", () => {
  inViewSticky();
  dualRangeSlider(0, 400, 100, 300);
});
