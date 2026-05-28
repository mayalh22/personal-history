const markers = Array.from(document.querySelectorAll(".arrow-marker"));

markers.forEach(function(marker) {
  marker.innerHTML = `
    <div class="arrow-wrap">
      <button class="arrow-btn" type="button">
        <div class="divider"></div>
        <div class="arrow-down"></div>
      </button>
    </div>
  `;
});

const page = document.getElementById("page");
const ordered = Array.from(page.children);

// Hide everything after first arrow
const firstArrowIndex = ordered.findIndex(el =>
  el.classList.contains("arrow-marker")
);

ordered.forEach(function(el, i) {
  if (i > firstArrowIndex) {
    el.style.display = "none";
  }
});

document.querySelectorAll(".arrow-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    const marker = btn.closest(".arrow-marker");
    const idx = ordered.indexOf(marker);

    let i = idx + 1;

    while (
      i < ordered.length &&
      !ordered[i].classList.contains("arrow-marker")
    ) {
      ordered[i].style.display = "";
      i++;
    }

    if (
      i < ordered.length &&
      ordered[i].classList.contains("arrow-marker")
    ) {
      ordered[i].style.display = "";
    }

    if (idx + 1 < ordered.length) {
      ordered[idx + 1].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});