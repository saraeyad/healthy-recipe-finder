export const NAV_LINKS = [
  { path: '/recipes', label: 'Recipes' },
  { path: '/plan', label: 'Plan' },
  { path: '/saved', label: 'Saved' },
  { path: '/about', label: 'About' },
]

export const FOOTER_LINKS = [
  { path: '/', label: 'Home' },
  ...NAV_LINKS,
]

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  RECIPES: '/recipes',
  PLAN: '/plan',
  SAVED: '/saved',
  RECIPE_DETAIL: '/recipe/:slug',
}

