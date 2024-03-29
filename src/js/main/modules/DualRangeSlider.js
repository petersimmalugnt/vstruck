export const dualRangeSlider = (minVal, maxVal, initFrom, initTo, callback) => {
  let curFrom = initFrom;
  let curTo = initTo;

  document.querySelectorAll(".dual-range-slider-wrapper").forEach((slider) => {
    const fromSlider = slider.querySelector(".from-slider");
    const toSlider = slider.querySelector(".to-slider");
    const fromInput = slider.querySelector(".from-input");
    const toInput = slider.querySelector(".to-input");

    const clamp = (value, min, max) => {
      return Math.min(Math.max(value, min), max);
    };

    const updateStyles = () => {
      const fromPercent = ((curFrom - minVal) / (maxVal - minVal)) * 100;
      const toPercent = ((curTo - minVal) / (maxVal - minVal)) * 100;
      fromInput.style.width = `${curFrom.length}ch`;
      toInput.style.width = `${curTo.length}ch`;
      toSlider.style.setProperty("--leftPercent", `${fromPercent}%`);
      toSlider.style.setProperty("--rightPercent", `${toPercent}%`);
      toSlider.style.borderLeftColor =
        fromPercent == 0 ? "var(--vs-black)" : "var(--light-grey)";
      toSlider.style.borderRightColor =
        toPercent == 100 ? "var(--vs-black)" : "var(--light-grey)";
    };

    const updateUI = () => {
      fromSlider.value = fromInput.value = curFrom;
      toSlider.value = toInput.value = curTo;
      updateStyles();
      if (callback) callback(curFrom, curTo);
    };

    const updateActiveInput = (e) => {
      const isRange = e.target.type == "range";
      curFrom = clamp(
        isRange ? fromSlider.value : fromInput.value,
        minVal,
        curTo
      );
      curTo = clamp(isRange ? toSlider.value : toInput.value, curFrom, maxVal);
      updateUI();
    };

    const inputTyping = (e) => {
      const el = e.target;
      el.value = clamp(el.value, minVal, maxVal);
      el.style.width = `${el.value.length}ch`;
    };

    const init = () => {
      [fromSlider, toSlider, fromInput, toInput].forEach((el) => {
        el.min = minVal;
        el.max = maxVal;
        el.step = 1;
        if (el.type == "range") {
          el.addEventListener("input", updateActiveInput);
        } else {
          el.addEventListener("change", updateActiveInput);
          el.addEventListener("input", inputTyping);
        }
      });
      updateUI();
    };

    init();
  });
};
