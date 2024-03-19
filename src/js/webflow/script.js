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
  document.addEventListener("click", (event) => {
    const withinToggle = event.target.closest(".dropdown-toggle-wrapper");
    const withinContent = event.target.closest(".dropdown-content-container");
    document.querySelectorAll(".dropdown-wrapper").forEach((dropdown) => {
      if (
        withinToggle &&
        withinToggle.closest(".dropdown-wrapper") === dropdown
      ) {
        dropdown.dataset.ddOpen =
          dropdown.dataset.ddOpen === "true" ? "false" : "true";
      } else if (!withinContent) {
        dropdown.dataset.ddOpen = "false";
      }
    });
  });
};

const cardSlider = () => {
  document.querySelectorAll(".card-btn-quickview").forEach((btn) =>
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      parent.style.setProperty(
        "--attrslide",
        getComputedStyle(parent).getPropertyValue("--attrslide").trim() === "3"
          ? "0"
          : "3"
      );
    })
  );
};

const readMoreToggle = () => {
  document
    .querySelectorAll(
      "[data-read-more-is-closed='true'], [data-read-more-is-closed='false']"
    )
    .forEach((e) =>
      e.addEventListener("click", (event) => {
        const { bottom } = e.getBoundingClientRect();
        const afterTop = bottom - parseFloat(getComputedStyle(e).fontSize) * 2;
        if (event.clientY >= afterTop && event.clientY <= bottom) {
          e.dataset.readMoreIsClosed =
            e.dataset.readMoreIsClosed === "false" ? "true" : "false";
        }
      })
    );
};

const stAttrToggle = () => {
  document
    .querySelectorAll(".trucksingle-attr-category-title-wrapper")
    .forEach((el) =>
      el.addEventListener("click", () => {
        document
          .querySelectorAll(".trucksingle-attr-category-title-wrapper")
          .forEach((allEl) =>
            allEl.parentElement.setAttribute("data-is-fr-one", "false")
          );
        const parent = el.parentElement;
        const attrValue = parent.getAttribute("data-is-fr-one") !== "true";
        parent.setAttribute("data-is-fr-one", attrValue);
      })
    );
};

/* buyingForm */
const buyingFormStep = () => {
  const wrapper = document.querySelector(".bf-wrapper");
  if (!wrapper) return;
  const price = wrapper.querySelector(".bf-modal-price");
  const priceUnit = wrapper.querySelector(".bg-modal-price-unit");
  const buyingOptions = wrapper.querySelectorAll(
    ".bg-buying-option-slot .bf-modal-finance-option"
  );
  const leasingPopupWrapper = wrapper.querySelector(
    ".bf-leasing-popup-wrapper"
  );
  const submitBtn = leasingPopupWrapper.querySelector(".bf-modal-submit-btn");

  wrapper
    .querySelectorAll(".bf-modal-close-btn, .bf-emptyspace")
    .forEach((closeEl) => {
      closeEl.addEventListener("click", (e) => {
        wrapper.setAttribute("data-step", "0");
        setTimeout(() => wrapper.setAttribute("data-step", "-1"), 700);
      });
    });

  wrapper
    .querySelector(".bf-modal-submit-btn")
    .addEventListener("click", (e) => {
      const step = Math.min(3, parseInt(wrapper.getAttribute("data-step")) + 1);
      wrapper.setAttribute("data-step", step);
    });

  wrapper.querySelector(".bf-modal-back-btn").addEventListener("click", (e) => {
    let step = parseInt(wrapper.getAttribute("data-step")) - 1;
    wrapper.setAttribute("data-step", step);
    if (step === 0)
      setTimeout(() => wrapper.setAttribute("data-step", "-1"), 700);
  });

  buyingOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      buyingOptions.forEach((otherOption, otherIndex) => {
        otherOption.setAttribute(
          "data-is-one",
          otherIndex === index ? "true" : "false"
        );
      });

      if (index === buyingOptions.length - 1) {
        leasingPopupWrapper.setAttribute("leasing-setting-open", "true");
        price.textContent = "8.528";
        priceUnit.textContent = "sek/mån";
      } else {
        leasingPopupWrapper.removeAttribute("leasing-setting-open");
      }

      price.textContent =
        index === 0 ? "84.000" : index === 1 ? "10.004" : "8.528";
      priceUnit.textContent = index === 0 ? "mån" : "sek/mån";
    });
  });

  submitBtn.addEventListener("click", () => {
    if (leasingPopupWrapper.getAttribute("leasing-setting-open") === "true") {
      leasingPopupWrapper.setAttribute("leasing-setting-open", "false");
    }
  });

  const ctaBtn = document.querySelector(".trucksingle-buy-btn");
  if (!ctaBtn) return;
  ctaBtn.addEventListener("click", (e) => {
    wrapper.setAttribute("data-step", "0");
    setTimeout(() => wrapper.setAttribute("data-step", "1"), 10);
  });
};

const truckSingelImagesScroll = () => {
  const wrapper = document.querySelector(".trucksingle-imgs-list-wrapper");
  if (!wrapper) return;
  const container = wrapper.querySelector(".trucksingel-imgs-list-container");
  if (!container) return;
  const contWidth = container.clientWidth;
  const offset = parseFloat(
    window.getComputedStyle(container).getPropertyValue("grid-column-gap")
  );

  document
    .querySelectorAll(".trucksingel-imgs-pagination-nr-wrapper")
    .forEach((e, i) => {
      e.addEventListener("click", () => {
        const targetPos = (contWidth + offset) * i;
        let currentProgress = 0;

        const scrollLoop = () => {
          if (currentProgress === 1) return;

          const ease = (x) => {
            return x + 0.0000001;
            1; //1 - Math.pow(1 - x, 3);
          };

          const newProgress = ease(currentProgress);
          const newPos = targetPos * newProgress;

          wrapper.scrollLeft = newPos;

          if (newProgress === 1) return;
          window.requestAnimationFrame(scrollLoop());
        };

        window.requestAnimationFrame(scrollLoop());
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  runInViewChecker();
  dualRangeSlider(100, 400, 100, 300);
  allFilterDdToggle();
  dropDowns();
  cardSlider();
  readMoreToggle();
  stAttrToggle();
  buyingFormStep();
  truckSingelImagesScroll();
});
