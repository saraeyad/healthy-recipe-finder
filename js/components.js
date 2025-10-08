// ===== HEADER =====
function renderHeader(currentPage = "") {
  const header = document.getElementById("header");
  header.className =
    "box-border p-4 md:p-8 md:pb-5 lg:py-5 shadow-[inset_0_-1px_0_0_theme(colors.neutral.200)] outline-neutral-200 bg-neutral-100 fixed w-full top-0 left-0 z-30";

  header.innerHTML = `
      <nav class="max-w-[1320px] mx-auto flex items-center justify-between" aria-label="Main navigation">
        <a href="./index.html">
          <img src="./assets/images/logo.svg" alt="Healthy recipe finder logo" />
        </a>

        <div
          id="nav-menu"
          class="absolute top-[72px] md:top-[92px] overflow-hidden p-2 lg:p-0 w-[calc(100%-32px)] md:w-[calc(100%-64px)] rounded-b-[10px] bg-white flex flex-col gap-[10px] opacity-0 -translate-y-5 pointer-events-none transition-all duration-300 ease-in-out lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:static lg:flex-row lg:items-center lg:justify-between lg:bg-transparent lg:w-2/3"
        >
          <ul class="flex flex-col lg:flex-row lg:gap-10 lg:justify-center lg:w-1/2">
            <li><a href="./index.html" class="nav-link" 
              ${
                currentPage === "index" ? 'aria-current="page"' : ""
              }>Home</a></li>
            <li><a href="./about.html" class="nav-link" 
              ${
                currentPage === "about" ? 'aria-current="page"' : ""
              }>About</a></li>
            <li><a href="./recipes.html" class="nav-link" 
              ${
                currentPage === "recipes" ? 'aria-current="page"' : ""
              }>Recipes</a></li>
          </ul>
          <a href="./recipes.html" class="btn btn-sm">Browse recipes</a>
        </div>

        <button
          class="z-50 w-10 h-10 rounded-sm bg-neutral-200 flex items-center justify-center lg:hidden"
          id="menu-btn"
          aria-controls="nav-menu"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <img id="humburger" src="./assets/images/icon-hamburger-menu.svg" alt="menu" />
        </button>
      </nav>
  `;
}

// ===== FOOTER =====
function renderFooter() {
  const footer = document.getElementById("footer");
  footer.innerHTML = `
    <div
        class="px-4 md:px-8 xl:px-0 mx-auto max-w-[1192px] pt-8 pb-5 md:py-10 flex flex-col-reverse gap-6 md:flex-row justify-between items-center md:gap-0"
      >
        <!-- Left -->
        <p class="text-preset-9 text-neutral-900">Made with ❤️ and 🥑</p>
        <!-- Right: social icons -->
        <div class="flex space-x-6">
          <a
            href="#"
            class="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Instagram"
            ><img src="./assets/images/icon-instagram.svg" alt=""
          /></a>
          <a
            href="#"
            class="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Bluesky"
            ><img src="./assets/images/icon-bluesky.svg" alt=""
          /></a>
          <a
            href="#"
            class="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Tiktok"
            ><img src="./assets/images/icon-tiktok.svg" alt=""
          /></a>
        </div>
      </div>
  `;
}

// ===== CTA SECTION =====
function renderCTA() {
  const cta = document.getElementById("cta");
  cta.innerHTML = `
    <div
          class="bg-neutral-200 max-w-[1192px] rounded-2xl py-12 md:py-20 lg:py-24 mx-auto px-4 relative overflow-hidden"
        >
          <img
            src="./assets/images/pattern-fork.svg"
            alt=""
            class="hidden md:block absolute md:-left-12 md:top-1/2 md:w-[180px] md:h-[231px] lg:-left-20 lg:top-4 lg:w-[314px] lg:h-[390px] object-contain pointer-events-none motion-safe:animate-moveY motion-reduce:animate-none"
            aria-hidden="true"
          />
          <img
            src="./assets/images/pattern-knife.svg"
            alt=""
            class="hidden md:block absolute md:-right-2 md:-top-12 md:w-[171px] md:h-[171px] lg:w-[338px] lg:h-[338px] lg:-right-14 lg:top-2 object-contain pointer-events-none motion-safe:animate-moveY2 motion-reduce:animate-none"
            aria-hidden="true"
          />
          <h2 class="text-preset-2 mb-3 relative z-10">
            Ready to cook smarter?
          </h2>
          <p class="text-preset-6 mb-8 md:mb-10 relative z-10">
            Hit the button, pick a recipe, and get dinner on the table—fast.
          </p>
          <a href="recipes.html" class="btn px-6 py-4 relative z-10"
            >Browse recipes</a
          >
        </div>
  `;
}

// ===== RECIPE CARD =====
export function renderRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className =
    "bg-white p-2 flex flex-col gap-4 text-center rounded-[10px] xl:w-[376px] shadow-[0_8px_16px_-9px_rgba(22,58,52,0.16)] focus-visible:ring-2 focus-visible:ring-orange-500 outline-none cursor-pointer animate-fadeIn";

  card.style.animationDelay = `${recipe.id * 100}ms`;
  // Accessibility attributes
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "group");
  card.setAttribute("aria-label", `Recipe card for ${recipe.title}`);

  // Inner content
  card.innerHTML = `
            <div class="recipeTop flex flex-col gap-4">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcset="${recipe.image.large}"
                />
                <img
                  src="${recipe.image.small}"
                  alt="${recipe.title}"
                  loading="lazy"
                  class="w-full object-cover rounded-[10px] max-h-[300px] md:max-h-[450px] lg:max-h-[300px]"
                />
              </picture>

              <div class="recipeInfo px-2 text-start">
                <div class="desciption mb-4">
                  <h3 class="mb-2.5 text-preset-5">${recipe.title}</h3>
                  <p class="text-preset-9">${recipe.overview}</p>
                </div>
                <ul
                  class="text-preset-9 details grid grid-cols-2 gap-x-4 gap-y-2 items-start w-fit md:grid-cols-3 lg:grid-cols-2"
                >
                  <li class="flex items-center gap-1.5">
                    <img src="./assets/images/icon-servings.svg" alt="" aria-hidden="true" />
                    Servings: ${recipe.servings}
                  </li>
                  <li class="flex items-center gap-1.5">
                    <img src="./assets/images/icon-prep-time.svg" alt="" aria-hidden="true" />
                    Prep: ${recipe.prepMinutes} mins
                  </li>
                  <li class="flex items-center gap-1.5">
                    <img src="./assets/images/icon-cook-time.svg" alt="" aria-hidden="true" />
                    Cook: ${recipe.cookMinutes} mins
                  </li>
                </ul>
              </div>
            </div>
            <a
              href="./recipe.html?slug=${recipe.slug}"
              class="text-preset-8 bg-neutral-900 text-white rounded-full px-8 py-3 mt-auto font-bold hover:bg-neutral-600 transition duration-300 ease-in "
            >
              View Recipe
            </a>
  `;

  // Click and keyboard interaction
  card.addEventListener("click", () => {
    window.location.href = `./recipe.html?slug=${recipe.slug}`;
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = `./recipe.html?slug=${recipe.slug}`;
    }
  });

  return card;
}

export function initPage(activePage) {
  renderHeader(activePage);
  renderFooter();

  // Only render CTA if the section exists (some pages may not have one)
  if (document.getElementById("cta")) {
    renderCTA();
  }
}
