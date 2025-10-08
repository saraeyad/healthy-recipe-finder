import { renderRecipeCard } from "./components.js";

const grid = document.getElementById("recipesGrid");
const searchInput = document.getElementById("searchInput");
let allRecipes = [];
let maxPrep = null;
let maxCook = null;

function renderRecipes(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML =
      '<p class="text-center text-preset-7">No recipes found.</p>';
    return;
  }

  list.forEach((r) => {
    const card = renderRecipeCard(r);
    grid.appendChild(card);
  });
}

function applyFilters() {
  const term = searchInput.value.toLowerCase();
  let filtered = allRecipes.filter(
    (r) =>
      r.title.toLowerCase().includes(term) ||
      r.overview.toLowerCase().includes(term)
  );

  if (maxPrep !== null) {
    filtered = filtered.filter((r) => r.prepMinutes <= maxPrep);
  }
  if (maxCook !== null) {
    filtered = filtered.filter((r) => r.cookMinutes <= maxCook);
  }

  renderRecipes(filtered);
}

async function loadRecipes() {
  document.getElementById("loadingMsg").textContent = "Loading recipes...";
  const res = await fetch("./data.json");
  allRecipes = await res.json();
  document.getElementById("loadingMsg").remove();
  applyFilters();
}

searchInput.addEventListener("input", applyFilters);

// Dropdown toggle logic
const prepBtn = document.getElementById("prepBtn");
const prepDropdown = document.getElementById("prepDropdown");
let isExpanded = false;

prepBtn.addEventListener("click", () => {
  prepDropdown.classList.toggle("hidden");
  isExpanded = prepDropdown.classList.contains("hidden") ? false : true;
  prepDropdown.setAttribute("aria-expanded", isExpanded);
});

const cookBtn = document.getElementById("cookBtn");
const cookDropdown = document.getElementById("cookDropdown");
cookBtn.addEventListener("click", () => {
  cookDropdown.classList.toggle("hidden");
  isExpanded = cookDropdown.classList.contains("hidden") ? false : true;
  cookDropdown.setAttribute("aria-expanded", isExpanded);
});

// Handle radio selection for prep
document.querySelectorAll('input[name="prep"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    maxPrep = e.target.value ? parseInt(e.target.value) : null;
    // Update button text
    document.getElementById("prepBtnText").textContent =
      maxPrep !== null ? `Max Prep: ${maxPrep} min` : "Max Prep Time";
    applyFilters();
    prepDropdown.classList.add("hidden");
  });
});

// Handle radio selection for cook
document.querySelectorAll('input[name="cook"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    maxCook = e.target.value ? parseInt(e.target.value) : null;
    // Update button text
    document.getElementById("cookBtnText").textContent =
      maxCook !== null ? `Max Cook: ${maxCook} min` : "Max Cook Time";
    applyFilters();
    cookDropdown.classList.add("hidden");
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!prepDropdown.contains(e.target) && !prepBtn.contains(e.target)) {
    prepDropdown.classList.add("hidden");
  }
  if (!cookDropdown.contains(e.target) && !cookBtn.contains(e.target)) {
    cookDropdown.classList.add("hidden");
  }
});

loadRecipes();
