function dropDowns() {
  document
    .querySelectorAll(".dropdown-toggle-container")
    .array.forEach((btn) => {
      btn.addEventListener(
        "click",
        () =>
          (btn.dataset.ddOpen =
            btn.dataset.ddOpen === "true" ? "false" : "true")
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  dropDowns();
});
