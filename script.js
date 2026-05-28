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

// Collect every element in document order that is a direct child of #page,
// or a direct child of a .section inside #page.
const page = document.getElementById("page");
const ordered = [];

Array.from(page.children).forEach(function(child) {
  if (child.tagName === "DIV" && child.classList.contains("section")) {
    Array.from(child.children).forEach(function(inner) {
      ordered.push(inner);
    });
  } else {
    ordered.push(child);
  }
});

// Hide everything after the first arrow-marker.
let firstArrowIndex = ordered.findIndex(function(el) {
  return el.classList.contains("arrow-marker");
});

ordered.forEach(function(el, i) {
  if (i > firstArrowIndex) {
    el.style.display = "none";
  }
});

// Each arrow reveals only the next item in the ordered list.
document.querySelectorAll(".arrow-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    const marker = btn.closest(".arrow-marker");
    const idx = ordered.indexOf(marker);

    // Reveal everything up to and including the next arrow-marker.
    let i = idx + 1;
    while (i < ordered.length && !ordered[i].classList.contains("arrow-marker")) {
      ordered[i].style.display = "";
      i++;
    }

    // Also reveal the next arrow-marker itself so its button is visible.
    if (i < ordered.length && ordered[i].classList.contains("arrow-marker")) {
      ordered[i].style.display = "";
    }

    // Scroll to the first revealed item.
    if (idx + 1 < ordered.length) {
      ordered[idx + 1].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    btn.style.visibility = "hidden";
  });
});