export const NAV_LINKS = [
  { path: '/recipes', label: 'Recipes' },
  { path: '/about', label: 'About' },
]

export const DASHBOARD_LINKS = [
  { path: '/dashboard', label: 'Overview' },
  { path: '/plan', label: 'Calendar' },
  { path: '/saved', label: 'Saved' },
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
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
}

