const runInViewChecker = () => {
  const elements = [
    ...document.querySelectorAll(
      '[data-scroll-inview="true"], [data-inview-target]:not([data-inview-target=""])'
    ),
  ];
  const grouped = elements.reduce((a, e) => {
    const t = e.getAttribute("data-inview-threshold") || "0";
    (a[t] = a[t] || []).push(e);
    return a;
  }, {});

  Object.entries(grouped).forEach(([threshold, els]) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targets =
            document.querySelectorAll(
              entry.target.getAttribute("data-inview-target")
            ) || [];
          const isIntersecting = entry.isIntersecting;
          const isPassed = entry.boundingClientRect.y <= 0 && !isIntersecting;

          [entry.target, ...targets].forEach((t) => {
            t.setAttribute("data-scroll-passed", isPassed);
            t.setAttribute("data-scroll-is-inview", isIntersecting);
          });
        });
      },
      { root: null, rootMargin: `0px`, threshold: parseFloat(threshold) }
    );

    els.forEach((e) => observer.observe(e));
  });
};

const dualRangeSlider = (minVal, maxVal, initFrom, initTo, callback) => {
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

const allFilterDdToggle = () => {
  // Lägger till click event listeners på .all-filter-dd-toggle element
  document.querySelectorAll(".all-filter-dd-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const listWrapper = this.nextElementSibling;
      if (listWrapper.classList.contains("all-filter-dd-list-wrapper")) {
        const isVisible =
          listWrapper.getAttribute("data-visibility-one") === "true";
        listWrapper.setAttribute("data-visibility-one", !isVisible);
      }
    });
  });

  // Funktion för att sätta data-visibility-one till false
  function closeListWrapper(closeButton) {
    const listWrapper = closeButton.closest(".all-filter-dd-list-wrapper");
    if (listWrapper) {
      listWrapper.setAttribute("data-visibility-one", "false");
    }
  }

  // Lägger till event listeners på .all-filter-dd-list-close-2 och .all-filter-dd-list-close-1
  document
    .querySelectorAll(
      ".all-filter-dd-list-close-2, .all-filter-dd-list-close-1"
    )
    .forEach((closeButton) => {
      closeButton.addEventListener("click", function () {
        closeListWrapper(this);
      });
    });
};

const dropDowns = () => {
  document.querySelectorAll(".dropdown-toggle-container").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".dropdown-toggle-wrapper");
      if (parent)
        parent.dataset.ddOpen =
          parent.dataset.ddOpen === "true" ? "false" : "true";
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  runInViewChecker();
  dualRangeSlider(100, 400, 100, 300);
  allFilterDdToggle();
  dropDowns();
});
