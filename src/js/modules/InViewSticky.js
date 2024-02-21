export const inViewSticky = () => {
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
            ["passed", "inview", "notinview"].forEach((c) => {
              t.setAttribute("data-scroll-passed", isPassed);
              t.setAttribute("data-scroll-is-inview", isIntersecting);
              t.classList.toggle(
                c,
                c === "passed"
                  ? isPassed
                  : c === "inview"
                  ? isIntersecting
                  : !isIntersecting
              );
            });
          });
        });
      },
      { root: null, rootMargin: `0px`, threshold: parseFloat(threshold) }
    );

    els.forEach((e) => observer.observe(e));
  });
};

[entry.target, ...targets].forEach((t) => {});
