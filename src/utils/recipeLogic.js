const MEAT = /\b(salmon|chicken|beef|pork|turkey|lamb|fish|tuna|shrimp|prawn|bacon|anchovy|sausage|meat)\b/i
const DAIRY = /\b(yogurt|yoghurt|cheese|milk|butter|cream|ghee|whey)\b/i
const EGG = /\beggs?\b/i
const HONEY = /\bhoney\b/i
const GLUTEN = /\b(bread|flour|wheat|pasta|barley|soy sauce|pita|naan|couscous|seitan|tortillas?)\b/i
const CORN_TORTILLA = /\bcorn tortillas?\b/gi
const PROTEIN = /\b(salmon|chicken|beef|pork|turkey|lamb|tuna|shrimp|eggs?|yogurt|yoghurt|lentils?|chickpeas?|black beans?|tofu|quinoa|edamame)\b/i

const QTY = /(\d+\s+\d+\/\d+|\d+\/\d+|\d+\.\d+|\d+)/g
const LEADING = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(?:\s+(cups?|tbsp|tsp|g|kg|ml|l|cloves?|cans?|slices?|fillets?))?\s+([\s\S]+)$/i

const FRACTIONS = [
  [0, ''],
  [0.25, '1/4'],
  [1 / 3, '1/3'],
  [0.5, '1/2'],
  [2 / 3, '2/3'],
  [0.75, '3/4'],
]

export const DIETS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'protein', label: 'Protein-forward' },
]

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'time', label: 'Quickest' },
  { id: 'prep', label: 'Least prep' },
  { id: 'name', label: 'A to Z' },
]

export const DAYS = [
  { id: 'sunday', label: 'Sunday' },
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
]

export const MEALS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
]

export function totalMinutes(recipe) {
  return (recipe?.prepMinutes || 0) + (recipe?.cookMinutes || 0)
}

export function hasGluten(ingredients = []) {
  return ingredients.some((line) => {
    const text = String(line)
    const withoutCornTortilla = text.replace(CORN_TORTILLA, '')
    return GLUTEN.test(withoutCornTortilla)
  })
}

export function classifyRecipe(recipe) {
  const ingredients = recipe?.ingredients || []
  const blob = ingredients.join('\n')
  const meat = MEAT.test(blob)
  const dairy = DAIRY.test(blob)
  const egg = EGG.test(blob)
  const honey = HONEY.test(blob)
  const diets = []

  if (!meat) diets.push('vegetarian')
  if (!meat && !dairy && !egg && !honey) diets.push('vegan')
  if (!hasGluten(ingredients)) diets.push('gluten-free')
  if (PROTEIN.test(blob)) diets.push('protein')

  const total = totalMinutes(recipe)
  const steps = recipe?.instructions?.length || 0
  let difficulty = 'Weekend'
  if (total <= 15 && steps <= 4) difficulty = 'Easy'
  else if (total <= 30) difficulty = 'Weeknight'

  return { diets, difficulty, total }
}

export function dietLabel(id) {
  return DIETS.find((diet) => diet.id === id)?.label || id
}

export function matchesSearch(recipe, term) {
  const tokens = String(term || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  if (!tokens.length) return true
  const haystack = [recipe.title, recipe.overview, ...(recipe.ingredients || [])]
    .join('\n')
    .toLowerCase()
  return tokens.every((token) => haystack.includes(token))
}

export function matchesDiet(recipe, diets = []) {
  if (!diets.length) return true
  const tags = new Set(classifyRecipe(recipe).diets)
  return diets.every((diet) => tags.has(diet))
}

export function filterAndSort(recipes, filters = {}) {
  const {
    searchTerm = '',
    maxPrep = null,
    maxCook = null,
    diets = [],
    sort = 'featured',
  } = filters

  const filtered = recipes.filter((recipe) => {
    const prepOk = maxPrep == null || recipe.prepMinutes <= maxPrep
    const cookOk = maxCook == null || recipe.cookMinutes <= maxCook
    return prepOk && cookOk && matchesSearch(recipe, searchTerm) && matchesDiet(recipe, diets)
  })

  const sorted = [...filtered]
  if (sort === 'time') {
    sorted.sort((a, b) => totalMinutes(a) - totalMinutes(b) || a.title.localeCompare(b.title))
  } else if (sort === 'prep') {
    sorted.sort((a, b) => a.prepMinutes - b.prepMinutes || a.title.localeCompare(b.title))
  } else if (sort === 'name') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    sorted.sort((a, b) => a.id - b.id)
  }
  return sorted
}

export function parseQuantity(token) {
  const mixed = String(token).trim().match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3])
  const fraction = String(token).trim().match(/^(\d+)\/(\d+)$/)
  if (fraction) return Number(fraction[1]) / Number(fraction[2])
  const value = Number(token)
  return Number.isFinite(value) ? value : null
}

export function formatQuantity(value) {
  if (!Number.isFinite(value)) return ''
  const negative = value < 0
  const absolute = Math.abs(value)
  if (absolute < 0.05) return '0'
  const rounded = Math.round(absolute * 1000) / 1000
  const whole = Math.floor(rounded + 1e-8)
  const fraction = rounded - whole
  let best = null
  let bestDistance = 0.045
  for (const [amount, label] of FRACTIONS) {
    const distance = Math.abs(fraction - amount)
    if (distance < bestDistance) {
      bestDistance = distance
      best = label
    }
  }
  let shown
  if (best == null) {
    const decimal = Math.round(rounded * 10) / 10
    shown = String(decimal)
  } else if (!best) {
    shown = String(whole)
  } else if (!whole) {
    shown = best
  } else {
    shown = `${whole} ${best}`
  }
  return negative ? `-${shown}` : shown
}

export function scaleIngredient(line, factor) {
  if (!Number.isFinite(factor) || factor === 1) return line
  return String(line).replace(QTY, (token) => {
    const amount = parseQuantity(token)
    if (amount == null) return token
    return formatQuantity(amount * factor)
  })
}

export function scaleIngredients(ingredients, baseServings, nextServings) {
  const base = Number(baseServings) || 1
  const next = Number(nextServings) || base
  const factor = next / base
  return ingredients.map((line) => scaleIngredient(line, factor))
}

function normalizeUnit(unit) {
  const value = String(unit || '').toLowerCase()
  if (!value) return ''
  if (value.startsWith('cup')) return 'cup'
  if (value === 'tbsp') return 'tbsp'
  if (value === 'tsp') return 'tsp'
  if (value.startsWith('clove')) return 'clove'
  if (value.startsWith('can')) return 'can'
  if (value.startsWith('slice')) return 'slice'
  if (value.startsWith('fillet')) return 'fillet'
  return value
}

function normalizeName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function parseIngredient(line) {
  const match = String(line).trim().match(LEADING)
  if (!match) {
    return { amount: null, unit: '', name: String(line).trim(), displayUnit: '' }
  }
  return {
    amount: parseQuantity(match[1]),
    unit: normalizeUnit(match[2] || ''),
    displayUnit: match[2] || '',
    name: match[3].trim(),
  }
}

export function buildShoppingList(entries, recipes) {
  const bySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]))
  const groups = new Map()

  entries.forEach((entry) => {
    const recipe = bySlug.get(entry.slug)
    if (!recipe) return
    const factor = (Number(entry.servings) || recipe.servings) / (recipe.servings || 1)
    recipe.ingredients.forEach((line) => {
      const scaled = scaleIngredient(line, factor)
      const parsed = parseIngredient(scaled)
      const key = parsed.amount == null
        ? `text:${normalizeName(parsed.name)}`
        : `qty:${parsed.unit}|${normalizeName(parsed.name)}`
      const current = groups.get(key)
      if (!current) {
        groups.set(key, {
          id: key,
          amount: parsed.amount,
          unit: parsed.unit,
          displayUnit: parsed.displayUnit,
          name: parsed.name,
          recipes: [recipe.title],
        })
        return
      }
      if (current.amount != null && parsed.amount != null) current.amount += parsed.amount
      if (!current.recipes.includes(recipe.title)) current.recipes.push(recipe.title)
    })
  })

  return [...groups.values()].map((item) => ({
    id: item.id,
    label: item.amount == null
      ? item.name
      : `${formatQuantity(item.amount)}${item.displayUnit ? ` ${item.displayUnit}` : ''} ${item.name}`.replace(/\s+/g, ' ').trim(),
    recipes: item.recipes,
  }))
}

const STOP_WORDS = new Set([
  'and', 'with', 'the', 'for', 'from', 'into', 'your', 'half', 'fresh', 'taste',
  'sliced', 'diced', 'minced', 'chopped', 'drained', 'rinsed', 'small', 'medium',
  'large', 'extra', 'virgin', 'ground', 'canned', 'plain', 'baby', 'ripe', 'each',
  'cups', 'tbsp', 'tsp', 'cloves', 'slices',
])

function ingredientWords(recipe) {
  const words = (recipe.ingredients || []).join(' ').toLowerCase().match(/[a-z]{4,}/g) || []
  return new Set(words.filter((word) => !STOP_WORDS.has(word)))
}

export function relatedRecipes(recipes, recipe, count = 3) {
  const mine = ingredientWords(recipe)
  return recipes
    .filter((item) => item.slug !== recipe.slug)
    .map((item) => {
      const words = ingredientWords(item)
      let shared = 0
      mine.forEach((word) => {
        if (words.has(word)) shared += 1
      })
      const timeGap = Math.abs(totalMinutes(item) - totalMinutes(recipe))
      return { item, score: shared * 10 - timeGap }
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, count)
    .map((entry) => entry.item)
}

export function todayId(timeZone = 'Asia/Hebron', now = new Date()) {
  const name = now.toLocaleDateString('en-US', { weekday: 'long', timeZone }).toLowerCase()
  return DAYS.some((day) => day.id === name) ? name : 'sunday'
}

export function weekOf(timeZone = 'Asia/Hebron', now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const pick = (type) => Number(parts.find((part) => part.type === type).value)
  const year = pick('year')
  const month = pick('month')
  const day = pick('day')
  const anchor = new Date(Date.UTC(year, month - 1, day))
  const sunday = new Date(anchor)
  sunday.setUTCDate(anchor.getUTCDate() - anchor.getUTCDay())

  const days = DAYS.map((info, index) => {
    const date = new Date(sunday)
    date.setUTCDate(sunday.getUTCDate() + index)
    return {
      ...info,
      short: info.label.slice(0, 3),
      date: date.getUTCDate(),
      monthShort: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
      isToday: date.getUTCDate() === day && date.getUTCMonth() === month - 1 && date.getUTCFullYear() === year,
    }
  })

  const first = days[0]
  const last = days[6]
  const range = first.monthShort === last.monthShort
    ? `${first.monthShort} ${first.date} – ${last.date}`
    : `${first.monthShort} ${first.date} – ${last.monthShort} ${last.date}`

  return { range, days }
}

export function emptyPlan() {
  return DAYS.reduce((plan, day) => {
    plan[day.id] = { breakfast: null, lunch: null, dinner: null }
    return plan
  }, {})
}

export function planEntries(plan) {
  const entries = []
  DAYS.forEach((day) => {
    MEALS.forEach((meal) => {
      const slot = plan?.[day.id]?.[meal.id]
      if (slot?.slug) entries.push({ ...slot, day: day.id, meal: meal.id })
    })
  })
  return entries
}
